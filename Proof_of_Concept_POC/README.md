# PROJECT OCEAN-SIGHT // MARITIME ST-GNN RESEARCH CONSOLE (v3.4)
**Thesis Title:** *A Cross-Modal Spatiotemporal Graph Framework for Detecting Dark-Vessel Candidates Using AIS Trajectories and Synthetic Aperture Radar (SAR) Imagery*  
**Academic Program:** Bachelor of Science in Computer Science (BSCS) &bull; CS Thesis 1 & Thesis 2  
**Institution:** College of Informatics and Computing Sciences (CICS), Batangas State University  
**Group 2 Researchers:**  
* 23-04923 **BAJIO, SANDARA B.** *(Lead Data Architect & GIS Specialist)*  
* 23-02544 **BRUAL, KEIRK XANDREX M.** *(ML & Graph Neural Network Lead)*  
* 23-02686 **BUSTOS, JANISON GIANE A.** *(Evaluation Lead & POC Developer)*  
**Operational Sector:** Batangas Bay, Port Anchorage Fairway & Verde Island Passage Approaches ($13.61^\circ\text{N}\text{--}13.83^\circ\text{N},\, 120.91^\circ\text{E}\text{--}121.08^\circ\text{E}$)

---

## 🚀 Quick Launch

### Option 1: Standalone Browser Mode (Zero Setup Required)
Open **[`Proof_of_Concept_POC/index.html`](file:///C:/Users/Drexsy/Desktop/Thesis%20workplace/Proof_of_Concept_POC/index.html)** directly in Google Chrome, Microsoft Edge, or any modern web browser.
* The console operates completely self-contained with offline client-side kinematics, Leaflet GIS cartography, bipartite graph edge computations, and evaluation benchmark matrices.
* Top bar displays `● API: STANDALONE`.

---

### Option 2: Full-Stack Mode with Node.js Live Server
Run the pure Node.js backend server (zero external dependencies needed):

```powershell
node Proof_of_Concept_POC/server.js
```

Then visit **[http://localhost:3080](http://localhost:3080)**.
* The dashboard automatically syncs and displays `● API: ONLINE (:3080)`.
* Pushes real-time 1Hz kinematic vessel updates via Server-Sent Events (SSE).

---

## 📡 Map & GIS REST API Endpoints

The server provides dedicated spatial GIS endpoints for cartographic layers, GeoJSON feature collections, and graph topology:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service status, active scenario, server uptime, and endpoint directory. |
| `GET` | `/api/map/layers` | Catalog of available spatial layers (Anchorage, Buffer, Fairways, Swath, Graph). |
| `GET` | `/api/map/tile-providers` | Basemap providers catalog (CartoDB DarkMatter, Esri Satellite, OpenStreetMap, OpenSeaMap). |
| `GET` | `/api/map/geojson/anchorage` | **NAMRIA Chart PH4401** Batangas Port Designated Anchorage Ground GeoJSON. |
| `GET` | `/api/map/geojson/shoreline-buffer` | **150m Coastal & Pier Clutter Mask** GeoJSON (Class 2 Ambiguity exclusion). |
| `GET` | `/api/map/geojson/fairways` | **Verde Island Passage Approach** shipping fairway corridors GeoJSON. |
| `GET` | `/api/map/geojson/sar-swath` | **Sentinel-1 C-Band SAR** IW GRD orbital swath footprint GeoJSON ($21:47\text{ UTC}$). |
| `GET` | `/api/map/geojson/targets` | Live vessel contacts as standard GeoJSON `Point FeatureCollection`. |
| `GET` | `/api/map/geojson/graph` | Live Bipartite Graph candidate & intra-modal edges as GeoJSON `LineString FeatureCollection`. |
| `GET` | `/api/targets` | Telemetry tensors, GATv2 attention weights, and discrepancy scores. |
| `POST` | `/api/detect` | Runs ST-GNN vs Baseline inference on custom target batches. |
| `GET` | `/api/stream` | Real-time 1Hz Server-Sent Events (SSE) push stream. |

### Quick cURL Tests

```bash
# 1. Fetch available GIS layers catalog
curl http://localhost:3080/api/map/layers

# 2. Fetch official NAMRIA Anchorage Geofence GeoJSON
curl http://localhost:3080/api/map/geojson/anchorage

# 3. Fetch Basemap Tile Providers (CartoDB, Esri Satellite, OpenSeaMap)
curl http://localhost:3080/api/map/tile-providers
```

---

## 🏛️ Academic Alignment & Dean's 6 Directives

This visual testbed directly demonstrates the core Computer Science contributions approved by Dr. Princess Marie B. Melo (Dean, CICS):

1. **Defensible Scientific Terminology:** Unmatched physical radar detections are framed probabilistically as **"AIS-SAR Discrepancies"** and **"Dark-Vessel Candidates"** ($\tau \in [0, 1]$), avoiding presumption of guilt or declaring craft definitively "illegal".
2. **Clear Computer Science Contribution:** Separates third-party data retrieval from in-house algorithms. The novel core is the **bipartite graph schema $\mathcal{G} = (\mathcal{V}_{\text{AIS}}, \mathcal{V}_{\text{SAR}}, \mathcal{E}_{\text{candidate}})$, cross-modal GATv2 attention matching, and anchorage-aware context filter**.
3. **Graph Justification (Multi-Target Disambiguation):** Visually demonstrates why nearest-neighbor distance matching collapses in Batangas Port queues (competing proximate ships causing identity swaps), whereas dynamic graph attention evaluates neighborhood kinematics collectively.
4. **Deterministic Three-Tier Ground Truth:**
   * **Class 0 (Matched Compliant):** Consistent radar and AIS pings ($R \le 1.5\text{ km}$, $\Delta t \le 15\text{ min}$, match confidence $\ge 50\%$).
   * **Class 1 (Dark-Vessel Candidate):** Verified radar detection $\ge 25\text{m}$ with zero AIS within the 5.0 km reachability bubble outside anchorages.
   * **Class 2 (Ambiguous Target):** Radar blips $< 25\text{m}$ (exempt under IMO SOLAS Chapter V Regulation 19), vessels inside designated anchorages, or within 150m of concrete piers (radar clutter). **Strictly masked from loss calculation to suppress false alarms.**
5. **Measurable Quantitative Metrics:** Prioritizes **False-Positive Rate (FPR)** alongside Precision, Recall, F1-Score, and Matching Accuracy, proving that anchorage geofencing reduces false alarms from $26.4\%$ down to $3.7\%$.
6. **30-Minute Matching Window ($\pm 15\text{ min}$) & 5.0 km Reachability Radius:** Grounded in coastal vessel physics—commercial ships navigating Batangas fairways operate under regulated harbor limits of 8 to 12 knots ($4.1\text{--}6.2\text{ m/s}$), bounding maximum displacement to $3.7\text{--}5.5\text{ km}$ and accommodating coastal VHF packet collision recovery intervals.

---

## 🔬 Core Console Features & Navigation

1. **Command Header (56px):**
   * **Brand & Blueprint:** Click **"Thesis Blueprint"** to open the full interactive academic slide-over modal containing the mathematical formulations, RRL citations, and team credentials.
   * **Scenario Selector:**
     * `Alpha (Fairway)`: Standard port traffic and queuing (11 vessels).
     * `Bravo (Congested)`: High-density anchorage clustering & ghost AIS spoofing (9 vessels).
     * `Charlie (Storm)`: Degraded VHF AIS radio transmissions & storm surge (5 vessels).
   * **Model Engine Toggle:** Quick toggle between **ST-GNN** and **Baseline** to witness identity swapping in real-time.
   * **Sensor Utilities:** Spaceborne Sentinel-1 C-Band SAR orbital pass overlay, graph topology edge toggle, live simulation pause (<kbd>Space</kbd>), and dual UTC / PST overpass clock ($21:47\text{ UTC} / 05:47\text{ PST}$).

2. **Leaflet Cartography & GIS Overlays:**
   * **Bipartite Reachability Graph Edges ($\mathcal{E}_{\text{candidate}}$):** Gated within $5.0\text{ km}$, displaying soft GATv2 attention association weights.
   * **Intra-Modal Neighborhood Edges ($\mathcal{E}_{\text{intra}}$):** Visualizing local traffic clustering between proximate vessels within $2.0\text{ km}$.
   * **Official NAMRIA Chart PH4401 Anchorage Geofence:** Digitized vector boundary of the PPA PMO Batangas anchorage waiting zone.
   * **150m Shoreline Infrastructure Buffer:** Masking pier and coastal clutter to prevent false alarms.

3. **Three-Tab High-Density Research Sidebar:**
   * **Tab 1: Target Telemetry & GNN Explainability:**
     * Dual meter for **Discrepancy Score ($\tau$)** and **GATv2 Match Affinity ($\alpha$)**.
     * 6-Cell Tensor Inspector for $\mathbf{x}_{\text{SAR}} \in \mathbb{R}^7$ and $\mathbf{x}_{\text{AIS}} \in \mathbb{R}^6$ (speed, heading, length, beam, radar backscatter dB, anchorage dwell, shoreline distance).
     * Explainable AI Diagnostic Terminal citing specific maritime regulations and reachability bounds.
   * **Tab 2: Fleet Roster Directory:**
     * Interactive search box and filter pills (`All`, `Class 1 Candidates`, `Class 0 Matched`, `Class 2 Ambiguous`, `Ghost`).
     * Direct target selection and smooth map camera pan.
   * **Tab 3: Evaluation Lab & Benchmark Matrix:**
     * Multi-model switcher: Proposed ST-GNN vs Baseline 1 (Hungarian), Baseline 2 (AIS IsoForest), Baseline 3 (SAR CFAR), and Ablations 1–3.
     * Core KPIs: False Alarm Rate (FPR), Precision, Recall, Matching Accuracy, and Latency ($42\text{ ms / scene}$).
     * Deterministic $2 \times 2$ Confusion Matrix with Class 2 Ambiguity masking.
     * **AIS Signal Dropout Stress Test Slider ($0\% \rightarrow 90\%$):** Simulating VHF packet collision loss and deliberate evasion.
     * **Traffic Density Stratification Tiers:** Low ($<3$), Medium ($3-7$), High ($>7\text{ vessels/km}^2$).
