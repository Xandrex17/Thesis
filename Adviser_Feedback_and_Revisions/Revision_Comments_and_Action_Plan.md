# Comments and Suggestions on the Revision — Action Plan & Checklist

**Project Title (Approved):**  
*A Cross-Modal Spatiotemporal Graph Framework for Detecting Dark-Vessel Candidates Using AIS Trajectories and SAR Imagery*

**Study Area:** Batangas Bay, Philippines  
**Target Discipline:** BS Computer Science  

---

## 1. Title & Terminology
- [ ] Adopt approved title: *A Cross-Modal Spatiotemporal Graph Framework for Detecting Dark-Vessel Candidates Using AIS Trajectories and SAR Imagery*
- [ ] Enforce the exact term **"dark-vessel candidate"** consistently across all sections (replace any absolute claims of "dark vessel" or "illegal ship").

---

## 2. Background of the Study (Topic Abstract)
- [ ] Condense the broad background (cut down global shipping history, basic AIS/SAR definitions).
- [ ] Follow the strict 6-step narrative spine:
  1. AIS limitations (cooperative, prone to gaps/spoofing/congestion)
  2. SAR as independent non-cooperative remote sensing
  3. The AIS-SAR correspondence / association problem
  4. Ambiguity and false positives in dense/anchorage waters
  5. The need for relational and spatiotemporal graph modeling
  6. The proposed framework

---

## 3. Research Gap (Keep Focused & Single)
- [ ] **Core Gap:** Prior work tackles AIS-SAR association and graph-based vessel modeling *separately*. This study bridges them by using relational and spatiotemporal context specifically to determine whether an AIS-SAR mismatch remains truly unexplained.
- [ ] Remove extraneous/unrelated secondary gaps.

---

## 4. Computer Science / Computational Contribution
- [ ] **Primary CS Contribution:** Heterogeneous spatiotemporal graph neural network with cross-modal attention and anchorage-aware contextual conditioning.
- [ ] Ensure AIS preprocessing, SAR bounding-box detection, and the POC dashboard are framed strictly as **supporting modules**, not competing primary contributions.

---

## 5. Graph Framework & Methodology
- [ ] Explicitly describe **candidate edge construction** prior to GNN processing (i.e., do not pre-assume matching pairs).
- [ ] Document edge & node features:
  - Spatial Euclidean & geodesic distance
  - Temporal offset ($\Delta t$)
  - Heading difference ($\Delta \theta$)
  - Speed consistency ($\Delta v$)
  - Local traffic density / neighbor count
  - Anchorage/berth proximity feature

---

## 6. Ground Truth & Labeling Strategy (Critical)
- [ ] Define the 3 target classes:
  1. **Matched Vessel**
  2. **Discrepancy Candidate**
  3. **Ambiguous Target**
- [ ] **Do NOT use spatial distance alone** as ground truth (avoids circular logic).
- [ ] Formalize the labeling protocol (e.g., multi-criteria validation, kinematic consistency, manual expert verification, synthetic outage injection).

---

## 7. Anchorage-Aware Filtering (Nuanced Framing)
- [ ] Avoid claims of determining "intent" or "proving illicit activity."
- [ ] Reframe as: *reducing false-positive discrepancy indications attributable to legitimate loitering, anchoring, or berth-waiting maneuvers.*

---

## 8. Specific Objectives (Max 4 Main Objectives)
- [ ] **Objective 1:** Data acquisition, alignment, and graph construction (AIS + Sentinel-1 SAR for Batangas Bay with candidate edges).
- [ ] **Objective 2:** Design and development of the cross-modal spatiotemporal graph model with anchorage awareness.
- [ ] **Objective 3:** Empirical evaluation against baselines (Hungarian algorithm, unimodal models, synthetic outage ablation).
- [ ] **Objective 4 (New POC Objective):** Develop a proof-of-concept (POC) visualization dashboard displaying SAR vessel detections, candidate AIS trajectory matches, association confidence, identified discrepancies, and the contextual factors driving the dark-vessel candidate classification.

---

## 9. Evaluation Protocol
- [ ] Elevate **False Positive Rate (FPR)** as a primary evaluation metric alongside Precision, Recall, and F1-score.
- [ ] Decouple evaluation into two distinct tasks:
  1. **Association Performance** (matching known AIS with corresponding SAR targets).
  2. **Discrepancy-Classification Performance** (correctly identifying true dark-vessel candidates vs. benign edge cases).
- [ ] Benchmark against: Hungarian matching, unimodal baselines, ablation variants, and synthetic AIS outage simulations.

---

## 10. Data Feasibility & Technical Justifications
- [ ] Verify availability and temporal overlap of **Sentinel-1 SAR** and **historical AIS** specifically for **Batangas Bay**.
- [ ] Provide a rigorous technical justification for the **30-minute matching window** (based on vessel kinematics, max speed drift, and satellite pass characteristics).

---

## 11. Significance of the Study (Realistic Scope)
- [ ] Tone down claims: remove statements like "stopping illegal maritime activities."
- [ ] Frame strictly as **decision-support**: prioritizing unexplained discrepancies for maritime authorities and environmental agencies to investigate.
