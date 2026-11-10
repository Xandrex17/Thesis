# System Architecture & Framework Flow
### Cross-Modal Spatiotemporal Graph Framework for Dark-Vessel Candidate Detection
> **Proponents:** Sandara Bajio | Keirk Xandrex Brual | Janison Giane Bustos (CS-4102)  
> **Adviser:** Dr. Princess Marie Melo  
> **Accompanying High-Resolution Vector Diagram:** [Architecture_Framework_Diagram.svg](file:///C:/Users/Drexsy/Desktop/Thesis%20workplace/Topic_Proposal/Architecture_Framework_Diagram.svg)

---

## 1. High-Level Architecture Flowchart

```mermaid
graph TD
    %% STAGE 1: INGESTION
    subgraph STAGE_1 ["STAGE 1: Sensor Ingestion & Preprocessing"]
        SAR_RAW["Sentinel-1 C-Band SAR<br>(Level-1 GRD, VH Polarization)"] --> CFAR["CFAR Target Detection (scipy)<br>Extract: Lat, Lon, Length, Width, σ° (dB)"]
        AIS_RAW["Coastal / Terrestrial AIS<br>(GFW / AISHub Archives)"] --> SPLINE["Kinematic Synchronization (±15 min)<br>Cubic Spline Interpolation: Lat, Lon, SOG, COG"]
        NAMRIA["NAMRIA Nautical Chart PH4401<br>(Digitized in QGIS by Keirk)"] --> GEOJSON["PPA Anchorage Geofence<br>Point-in-Polygon Ray Casting"]
        GEOJSON --> CFAR
    end

    %% STAGE 2: GRAPH BUILDER
    subgraph STAGE_2 ["STAGE 2: Heterogeneous Graph Construction (PyTorch Geometric)"]
        CFAR --> SAR_NODES["SAR Target Nodes (V_SAR)<br>[lat, lon, L, W, σ°, I_anchorage, d_boundary]"]
        SPLINE --> AIS_NODES["AIS Vessel Nodes (V_AIS)<br>[lat, lon, SOG, COG, type_id, Δt_last_ping]"]
        
        SAR_NODES <-->|"Candidate Edges (R ≤ 5.0 km)<br>[dist, Δt, heading_cos, reachability]"| AIS_NODES
        SAR_NODES -.-|"SAR-SAR Edges (r ≤ 2.0 km)<br>Local Reflector Density"| SAR_NODES
        AIS_NODES -.-|"AIS-AIS Edges (r ≤ 2.0 km)<br>Convoy Navigational Context"| AIS_NODES
    end

    %% STAGE 3: GNN REASONING
    subgraph STAGE_3 ["STAGE 3: Cross-Modal Attention Reasoning (GATv2)"]
        SAR_NODES --> PROJ["Modality Projections (MLP, d = 128)"]
        AIS_NODES --> PROJ
        PROJ --> GAT["Dynamic GATv2 Attention (L = 2 Layers)<br>Evaluates Kinematic Coherence & Attenuates Anchorage Loitering"]
        GAT --> FOCAL["Optimization: Class-Weighted Focal Loss (γ = 2.0)<br>Hard-Negative Mining for Imbalanced Candidate Links"]
    end

    %% STAGE 4: DECISION & TRIAGE
    subgraph STAGE_4 ["STAGE 4: Three-Tier Decision Rule & POC Triage"]
        GAT --> SIGMOID["Edge Link Scoring Head (Sigmoid)<br>Calculates Association Probability P(Match) ∈ [0, 1]"]
        SIGMOID --> DECISION{"Max Candidate Link<br>P ≥ 0.50 ?"}
        DECISION -->|"YES (≥ 0.50)"| CLASS_0["Class 0: Matched Compliant Vessel<br>(Confirmed Broadcasting Identity)"]
        DECISION -->|"NO (< 0.50)"| AMBIG_CHECK{"Inside Anchorage,<br>Small Banca (<25m), or<br>Near Pier (<150m) ?"}
        AMBIG_CHECK -->|"YES"| CLASS_2["Class 2: Ambiguous Target<br>(Exempt banca or harbor wait: Low Risk / Filtered)"]
        AMBIG_CHECK -->|"NO"| CLASS_1["Class 1: Dark-Vessel Candidate<br>(Unexplained commercial target: High Priority Alert)"]
    end

    %% STAGE 5: BENCHMARK LADDER
    subgraph STAGE_5 ["STAGE 5: Benchmark Validation & Baselines"]
        CLASS_0 -.-> BENCH["Comparative Benchmarking<br>• Baseline 1: Greedy Hungarian (scipy)<br>• Baseline 2: AIS Anomaly IsolationForest (sklearn)<br>• Baseline 3: SAR CFAR Only (scipy)<br>• Ablations: No-Graph, No-Anchorage, No-Intra"]
        CLASS_1 -.-> BENCH
    end

    classDef stageStyle fill:#ffffff,stroke:#000000,stroke-width:1.5px;
    classDef boxStyle fill:#f9f9f9,stroke:#000000,stroke-width:1px;
    classDef alertStyle fill:#f0f0f0,stroke:#000000,stroke-width:2px;
    class STAGE_1,STAGE_2,STAGE_3,STAGE_4,STAGE_5 stageStyle;
    class CFAR,SPLINE,GEOJSON,SAR_NODES,AIS_NODES,PROJ,GAT,FOCAL,SIGMOID,BENCH boxStyle;
    class CLASS_1 alertStyle;
```

---

## 2. Step-by-Step Flow Explanation (How to Explain to the Panel)

### Stage 1: Data Ingestion & Preprocessing
- **SAR Satellite Branch:** Sentinel-1 radar images pass through a standard Constant False Alarm Rate (CFAR) algorithm (`scipy.signal`) to detect ships as metallic reflectors, extracting their coordinates, length, width, and radar brightness.
- **AIS GPS Branch:** Broadcasted coastal AIS records within $\pm 15\text{ minutes}$ of the satellite overpass are interpolated using cubic Hermite splines (`scipy.interpolate`) to estimate exact ship positions at the moment the satellite took the picture.
- **Harbor Geofence:** Keirk digitizes the Batangas Port anchorage boundary from the official NAMRIA map in QGIS. `GeoPandas` flags which radar detections are sitting inside this harbor boundary.

### Stage 2: Heterogeneous Graph Construction (`torch_geometric.data.HeteroData`)
- **Two Node Types:** AIS nodes (carrying speed, course, ping age) and SAR nodes (carrying size, radar brightness, anchorage flag).
- **Candidate Links ($\le 5.0\text{ km}$):** Draws unconstrained connection lines between every radar blip and any ship within 5 km (the physical drift limit at 12 knots over 15 minutes).
- **Neighbor Links ($\le 2.0\text{ km}$):** Connects neighboring AIS ships to each other, and neighboring radar blips to each other, so the model learns convoy patterns and congested harbor queues.

### Stage 3: Cross-Modal Attention (`GATv2Conv`)
- **Shared Space ($d = 128$):** Small MLPs project AIS and SAR features into a common embedding space.
- **2 Layers of GATv2:** GATv2 computes attention weights on every candidate link. It checks:
  1. *Are they close enough?*
  2. *Is the ship moving in the same direction the radar blob is pointing?*
  3. *Is the ship parked inside the anchorage area?* (If yes, stationary behavior is treated as normal waiting, not suspicious).
- **Focal Loss ($\gamma = 2.0$):** Handles class imbalance because 90% of candidate lines are false connections.

### Stage 4: Three-Tier Decision Rule and Candidate Alerting
- An edge scoring head calculates a matching probability between 0% and 100%.
- **Decision Rule ($\tau = 0.50$):**
  1. *If match probability $\ge 50\%$* $\rightarrow$ **Class 0: Matched Compliant Vessel** (normal broadcasting traffic).
  2. *If match probability $< 50\%$, check ambiguity:*
     - Is it inside the official port anchorage area?
     - Is it a small artisanal banca ($< 25\text{ m}$, legally exempt from AIS under IMO SOLAS)?
     - Is it within $150\text{ m}$ of a pier or breakwater (land clutter)?
     - **If YES** $\rightarrow$ **Class 2: Ambiguous Target** (Low Risk / Filtered out to avoid false alarms).
     - **If NO** $\rightarrow$ **Class 1: Dark-Vessel Candidate** (High Risk: unexplained commercial ship in fairway, flagged for Coast Guard patrol triage).

### Stage 5: Benchmark Validation Ladder
- Evaluated against 3 baselines:
  1. *Hungarian Matching:* Simple distance matching (proves graph beats distance).
  2. *AIS Anomaly:* Trajectory-only ML (proves radar is needed when transponders are off).
  3. *SAR CFAR:* Radar-only (proves AIS cross-referencing is needed).
- And 3 ablation models (turning off graph, anchorage filter, and neighbor edges one by one).
