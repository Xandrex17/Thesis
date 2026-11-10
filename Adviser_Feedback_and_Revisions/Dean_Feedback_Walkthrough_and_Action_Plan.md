# Dean's Feedback Walkthrough & Quick Action Plan

> **Topic:** A Cross-Modal Spatiotemporal Graph Framework for Detecting Dark-Vessel Candidates Using AIS Trajectories and SAR Imagery  
> **Proponents:** Bajio, Sandara B. | Brual, Keirk Xandrex M. | Bustos, Janison Giane A.  
> **Status:** **Approved in Principle for BSCS.** Proceeding to Methodology and POC development upon clarifying 4 technical points.

---

## 1. Executive Summary

- **Overall Verdict:** The Dean approved the BSCS computational contribution (Heterogeneous Spatiotemporal GNN with Cross-Modal Attention).
- **Core Requirements Before Final Endorsement:**
  1. Clarify the **4 technical defense points** (Ground truth, candidate edges, 30-min window, data feasibility).
  2. **Shorten the Background** from ~1,200 words to ~400–500 words.
  3. Consolidate to **4 clean Specific Objectives** (including a new 4th objective for the POC).
  4. Make **False-Positive Rate (FPR)** a primary evaluation metric.

---

## 2. The 4 Big Technical Clarifications (Ready for Defense)

### Q1. Ground-Truth Labeling Procedure (Avoiding Circular Distance Logic)
* **The Problem:** Distance alone ($\le 1.5\text{ km}$) cannot be ground truth. In dense traffic, multiple ships sit close together, and the GNN would merely learn a distance threshold.
* **The Defense Answer:** Use a **multi-criteria consensus protocol**:
  1. **Isolated Anchor Matches:** Real-world pairs verified in open waters where only one vessel exists within $>3\text{ km}$ and SAR physical dimensions/heading match AIS telemetry within radar error margins ($\pm 20\%$).
  2. **Synthetic AIS Dropouts:** Artificially mask or drop 10%–90% of AIS pings from verified vessels. This creates **100% mathematically proven ground-truth discrepancy targets** to measure detection without guesswork.
  3. **Ambiguous Filtering:** Vessels $<25\text{ m}$ (legally exempt from AIS under SOLAS) or $<150\text{ m}$ from piers (radar multipath clutter) are labeled *Ambiguous* and masked out from training loss.

---

### Q2. How Candidate Edges Are Built (Before the GNN Runs)
* **The Problem:** The graph must not already assume which AIS vessel matches which SAR detection.
* **The Defense Answer:** Construct an **unconstrained bipartite candidate subgraph**:
  1. For every SAR detection, draw candidate edges to **all** AIS nodes within an unconstrained reachability gating radius ($R_{\text{max}} = 5.0\text{ km}$, bounded by the $5.55\text{ km}$ maximum kinematic displacement ceiling at 12 knots across 15 minutes).
  2. In congested traffic, a single SAR node connects to 5–12 candidate AIS nodes.
  3. Add **inter-vessel edges** (AIS–AIS, SAR–SAR) within a $2\text{ km}$ radius to capture local traffic density.
  4. **The GNN's Job:** Cross-Modal Graph Attention evaluates these edges. If all candidate edges for a SAR node yield near-zero link probability, that node is classified as an unexplained discrepancy.

---

### Q3. Technical Basis for the 30-Minute Matching Window
* **The Problem:** Why 30 minutes ($\pm 15$ min)? It cannot be an arbitrary guess.
* **The Defense Answer:** Grounded in **kinematic drift limits** and **terrestrial AIS latency**:
  1. **Kinematic Limits:** Harbor approach vessels in Batangas Bay move at 8–12 knots ($4.1\text{--}6.2\text{ m/s}$). Within $\pm 15$ min ($900\text{ s}$), maximum displacement is $\approx 5.5\text{ km}$, where trajectory spline interpolation error stays low ($<50\text{ m}$). Beyond 15 min, harbor maneuvering and speed changes cause interpolation to diverge ($>1\text{ km}$).
  2. **AIS Latency:** Coastal radio interference causes burst packet drops lasting 5–12 minutes. A $\pm 15$-minute window guarantees capturing at least 2–4 valid pings before and after satellite overpass for reliable interpolation.

---

### Q4. Data Feasibility in Batangas Bay
* **The Problem:** Confirm actual availability of overlapping SAR scenes and AIS telemetry.
* **The Defense Answer:**
  1. **Sentinel-1 SAR:** Level-1 GRD products are freely downloadable via Copernicus Data Space Ecosystem (CDSE). With a 12-day repeat orbit cycle, Batangas Bay ($13.60^\circ\text{N}\text{--}13.85^\circ\text{N},\, 120.90^\circ\text{E}\text{--}121.15^\circ\text{E}$) has **40–60 historical SAR scenes** across a 12–24 month historical window.
  2. **AIS Data:** Sourced from **Global Fishing Watch (GFW)** open data and public coastal archives (AISHub), with an academic data request submitted to PCG / PPA PMO Batangas.
  3. **Guaranteed Fallback:** Pre-train/benchmark on the public **xView3-SAR** global dataset ($>1,000$ scenes) and fine-tune/evaluate on the Batangas Bay historical dataset.

---

## 3. Required Document Revisions (At a Glance)

| Section | Dean's Directive | Action / Exact Fix |
|:---|:---|:---|
| **Title** | Use recommended alternative title. | Change to: *A Cross-Modal Spatiotemporal Graph Framework for Detecting Dark-Vessel Candidates Using AIS Trajectories and SAR Imagery*. Consistently use "dark-vessel candidate". |
| **Background** | Too long; cut global fleet trivia. | Cut UNCTAD tonnage and general primers. Follow a 6-step chain: *AIS limits $\rightarrow$ SAR observation $\rightarrow$ Correspondence problem $\rightarrow$ Harbor ambiguity $\rightarrow$ Graph modeling need $\rightarrow$ Proposed framework*. |
| **Research Gap** | Focus on the single strongest gap. | Keep one unified gap: Joint relational and spatiotemporal graph modeling to determine if an AIS-SAR mismatch remains unexplained. |
| **CS Contribution** | Keep GNN as the main contribution. | Highlight the Heterogeneous GNN and Cross-Modal Attention. Position preprocessing and POC as supporting modules. |
| **Anchorage Filter** | Tone down "proves intent" language. | Rephrase to: *"reduces false-positive discrepancy indications associated with normal anchorage or berth-waiting behavior."* |
| **Objectives** | Keep to 3–4 high-level; add POC. | Consolidate sub-bullets into Chapter 3 (Methodology). Add **Objective 4 for the interactive POC dashboard**. |
| **Evaluation** | Emphasize false alarms; split tasks. | Make **False-Positive Rate (FPR)** a primary metric with Precision/Recall/F1. Separate *Vessel Association* evaluation from *Discrepancy Detection* evaluation. |
| **Significance** | Tone down claims. | Change "stopping illegal maritime activities" to *"automated decision support prioritizing discrepancies for physical verification."* |

---

## 4. Ready-to-Copy Revised Topic Abstract

### Title
**A Cross-Modal Spatiotemporal Graph Framework for Detecting Dark-Vessel Candidates Using AIS Trajectories and SAR Imagery**

### Background of the Proposed Topic
The Automatic Identification System (AIS) is the standard for maritime tracking, broadcasting identity and kinematic telemetry to monitor vessel activity. However, AIS data completeness is constrained by radio packet collisions, terrain shielding, signal blind spots, and unmonitored transponder dropouts. These limitations create operational uncertainty, as an absent signal may reflect either a transmission fault or deliberate non-broadcasting. Synthetic Aperture Radar (SAR), such as Sentinel-1, provides independent, all-weather satellite observations of physical vessel presence, regardless of transponder status.

Integrating AIS and SAR introduces a difficult cross-modal correspondence problem. In congested waterways like Batangas Bay—characterized by dense port traffic and crowded anchorages—spatial proximity alone is insufficient for reliable matching. Multiple nearby vessels, variable maneuvering speeds, and legitimate berth-waiting loitering generate severe ambiguity. Under these conditions, conventional distance-based matching generates excessive false-positive discrepancy indications.

Existing literature addresses these elements in isolation: multi-feature association methods rely primarily on pairwise geometric metrics without modeling inter-vessel relational context, while spatiotemporal graph neural networks have been applied almost exclusively to AIS-only trajectory prediction. To bridge this gap, this study proposes a heterogeneous spatiotemporal graph neural network that models vessels and detections as interacting entities. By incorporating cross-modal graph attention and anchorage-aware context, the framework determines whether an AIS-SAR mismatch is an explainable transmission anomaly or an unexplained dark-vessel candidate.

### Problem Statement
1. **Correspondence Ambiguity in Dense Traffic:** Difficulty resolving one-to-one AIS-SAR correspondence when multiple candidate vessels share overlapping spatial and kinematic bounds.
2. **High False-Positive Discrepancy Rates:** Tendency of conventional matching heuristics to misclassify legitimate transmission dropouts, positional drift, and routine anchorage waiting as dark-vessel anomalies.
3. **Absence of Context-Aware Cross-Modal Graph Representations:** Lack of frameworks that jointly model multi-vessel relational dynamics and geographic anchorage constraints to filter explainable maritime discrepancies.

### Objectives of the Study
#### General Objective:
To formulate, evaluate, and implement a cross-modal spatiotemporal graph neural network that associates Sentinel-1 SAR observations with AIS trajectories to detect correspondence discrepancies and identify dark-vessel candidates, while suppressing false-positive indications induced by harbor congestion and routine anchorage loitering in Batangas Bay.

#### Specific Objectives:
1. **Dataset Curation & Spatiotemporal Synchronization:**  
   Curate and temporally co-register a multimodal dataset of historical Sentinel-1 SAR imagery and AIS telemetry covering Batangas Bay within a kinematically bounded 30-minute observation window ($\pm 15$ min), applying trajectory interpolation and establishing a deterministic three-tier labeling protocol (Matched Vessel, Discrepancy Candidate, and Ambiguous Target) under time-blocked and vessel-disjoint partitioning.
2. **Heterogeneous Graph Neural Network Formulation:**  
   Develop a dynamic heterogeneous spatiotemporal graph model where AIS kinematics and SAR detections serve as nodes linked by reachability candidate edges and inter-vessel interaction edges, incorporating a cross-modal graph attention mechanism and an anchorage-aware contextual filter to evaluate association confidence and discrepancy scores.
3. **Quantitative Evaluation & Robustness Benchmarking:**  
   Evaluate association accuracy and discrepancy detection performance—with primary emphasis on False-Positive Rate (FPR), Precision, Recall, and F1-score—benchmarking against a Hungarian matching baseline, unimodal architectures, and ablation variants under synthetically induced AIS outages (10% to 90% missing ping rates) and stratified traffic density tiers.
4. **Proof-of-Concept (POC) Implementation:**  
   Develop an interactive proof-of-concept dashboard that visualizes SAR vessel detections, candidate AIS trajectory matches, association confidence levels, flagged dark-vessel candidates, and contextual anchorage factors contributing to model classifications.

### Significance of the Study
- **Maritime Authorities & Coast Guards:** Provides an automated decision-support tool that prioritizes genuine AIS-SAR discrepancies over routine transmission gaps, improving surveillance focus in crowded coastal waters.
- **Port Administrators (PPA PMO Batangas):** Delivers supplementary domain awareness contextualizing vessel congestion and loitering behaviors in designated anchorage zones.
- **Environmental & Fisheries Monitoring:** Enhances surveillance in sensitive marine corridors by flagging unbroadcasting vessel candidates for physical inspection.
- **Computer Science Research:** Introduces a novel cross-modal heterogeneous graph architecture for multimodal sensor association and benchmark methodology under observational ambiguity.

---

## 5. Team Task Division

- **Keirk Xandrex** *(Lead Architect)*: Replace title with Alternative Title; insert the 4 revised Specific Objectives; write candidate edge gating formulation ($R_{\text{max}} = 5.0\text{ km}$); digitize NAMRIA anchorage polygon in QGIS.
- **Sandara** *(Data Architect)*: Write out the 30-min kinematic drift rationale ($\pm 15$ min limit); document Sentinel-1 CDSE orbit schedule and GFW AIS download pipeline.
- **Janison Giane** *(Evaluation & UI Lead)*: Separate Association vs. Discrepancy metrics (featuring FPR as primary); draft layout for Specific Objective 4 (Streamlit POC).
