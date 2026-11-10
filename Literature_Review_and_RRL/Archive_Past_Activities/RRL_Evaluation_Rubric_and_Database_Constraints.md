# Strict RRL Significance, Gap-Testing & Thesis Support Framework

> **Degree Program:** Bachelor of Science in Computer Science (BSCS) — Batangas State University  
> **Thesis Title:** *A Cross-Modal Spatiotemporal Graph Framework for Detecting Dark-Vessel Candidates Using AIS Trajectories and SAR Imagery*  
> **Scope:** Batangas Bay, Port Waters & Designated Anchorages  
> **Institutional Mandate:** Formally calibrated against `RRL_PDF_Lesson.pdf` (CICS RRL Lecture) and `Recommended Research Databases and Scholarly Resources .pdf`.  
> **Mission:** A strict, automated gatekeeper to test whether candidate literature is **scientifically significant**, **directly supports our 4 specific objectives**, **exposes critical research gaps**, and **provides mathematical/empirical value** for our thesis.

---

## 1. The 4 Non-Negotiable Gatekeeper Prerequisites (Pass/Fail)

Before any paper is scored, it must pass all 4 baseline gates:

1. **Gate 1: Accredited Database Verification (Dean's Priority List):**  
   Must be indexed in **IEEE Xplore, ScienceDirect (Elsevier), ACM Digital Library, SpringerLink, Scopus (Q1/Q2), Web of Science (SCIE), or DBLP**. Commercial blogs (*Kpler*), advocacy sites (*SeaLight*), and unverified preprints (*arXiv*) fail immediately.
2. **Gate 2: "No Actual Article, No Citation" Rule (Lesson Slide 11):**  
   The full-text PDF must be located and verified. No citing based solely on abstracts or AI-generated snippets.
3. **Gate 3: Peer-Review & Anti-Hallucination Integrity (Lesson Slide 34):**  
   Must possess an active, verifiable DOI (`https://doi.org/...`) and formal editorial peer-review oversight.
4. **Gate 4: 5-Year Thesis Recency Window (Lesson Slide 8):**  
   Must be published between **2022 and 2026** (unless it is a foundational benchmark paper like Forti et al., 2022 or Welch et al., 2022).

---

## 2. Academic Credibility Rating Matrix

Every candidate paper is graded on its peer-review rigor and academic trust level:

| Credibility Grade | Trust Level | Publication Venues & Indexing | Status in Thesis |
|:---:|:---:|:---|:---:|
| **GRADE S (Elite)** | **95%–100%** | *Science Advances*, *Nature*, *IEEE Transactions* (T-ITS, T-AES), *Remote Sensing of Environment* (Elsevier Q1, IF > 10). Indexed in Web of Science SCIE & Scopus Q1. | **Gold-Standard Anchor** (Core mathematical & defense backing) |
| **GRADE A (High)** | **85%–94%** | *Ocean Engineering*, *Reliability Engineering & System Safety*, *IEEE Access*, *Remote Sensing* (MDPI), *Procedia CS*, *Pattern Recognition Letters*. Indexed in Scopus Q1/Q2 & DBLP. | **Primary Academic Study** (Standard literature review & baselines) |
| **GRADE B (Moderate)** | **70%–84%** | Intergovernmental technical reports (*UNCTAD*, *IMO*), *Taylor & Francis*, *Wiley*, verified regional CS conferences. | **Contextual Reference** (Background statistics & definitions only) |
| **GRADE C (Risky)** | **50%–69%** | Non-peer-reviewed *arXiv* preprints, unverified conference drafts. | **Restricted / Provisional** (Must find peer-reviewed published version) |
| **GRADE F (Unacceptable)** | **< 50%** | Commercial blogs (*Kpler*), advocacy websites (*SeaLight*), *Medium*, *Wikipedia*. | ❌ **PROHIBITED** (Automatic Rejection) |

---

## 3. The 20-Point Strict Significance & Gap-Testing Rubric

Every candidate paper is evaluated across **4 categories and 11 sub-bullets** totaling **20.0 points**:

```
┌────────────────────────────────────────────────────────────────────────┐
│             STRICT THESIS SIGNIFICANCE & GAP-TESTING MATRIX            │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
      ┌────────────────────────────┼────────────────────────────┐
      ▼                            ▼                            ▼
Criterion 1:                 Criterion 2:                 Criterion 3:
Database Credibility         Objective Support            Gap Exposure & Synthesis
(Max 5.0 Pts)                (Max 6.0 Pts)                (Max 5.0 Pts)
  • 1.1 Dean Database: 2.5     • 2.1 ST-GNN: 2.0            • 3.1 Limitation/Gap: 2.0
  • 1.2 Scopus Tier:   1.5     • 2.2 Cross-Modal: 2.0       • 3.2 5-Step Formula: 1.5
  • 1.3 Review Rigor:  1.0     • 2.3 Port/Dark: 2.0         • 3.3 Defense Armor:  1.5
                                   │
                                   ▼
                             Criterion 4:
                             Methodological Utility
                             (Max 4.0 Pts)
                               • 4.1 Benchmark/Baselines: 2.0
                               • 4.2 Math/Data Transfer:  2.0
```

---

### Category 1: Scientific Credibility & Database Authority (Max 5.0 Points)
* **1.1 Database & Publisher Tier (`/2.5 pts`):**
  * `2.5 pts`: Dean's Tier A Priority (*IEEE Xplore, ScienceDirect/Elsevier, ACM, SpringerLink, Scopus, Web of Science, DBLP*).
  * `1.8 pts`: Reputable secondary open access (*MDPI Remote Sensing/Sensors, Taylor & Francis, Wiley*).
  * `0.8 pts`: Unreviewed preprint on *arXiv*.
  * `0.0 pts`: Commercial blogs, news sites, or unindexed sources.
* **1.2 Indexing Quartile & Prestige (`/1.5 pts`):**
  * `1.5 pts`: Scopus Q1 or Web of Science SCIE top quartile / CORE Rank A/A* conference.
  * `1.0 pt` : Scopus Q2 / CORE Rank B conference.
  * `0.5 pts`: Scopus Q3/Q4 / institutional proceedings.
  * `0.0 pts`: Unindexed or gray literature.
* **1.3 Peer-Review Rigor & Verified DOI (`/1.0 pt`):**
  * `1.0 pt` : Rigorous blind peer review with permanent DOI (`https://doi.org/...`).
  * `0.5 pts`: Institutional report with formal editorial oversight.
  * `0.0 pts`: Self-published, unreviewed preprint, or commercial text.

---

### Category 2: Direct Support for Thesis Objectives (Max 6.0 Points)
* **2.1 Support for Objective 2 (Spatiotemporal Graph Modeling) (`/2.0 pts`):**
  * `2.0 pts`: Directly models vessel interactions, trajectory dynamics, or multi-ship topologies using GNNs, ST-GCN, GAT, or graph diffusion.
  * `1.0 pt` : Uses general deep learning (Transformers, LSTMs, CNNs) for trajectories without explicit graph networks.
  * `0.0 pts`: No spatial or relational trajectory modeling.
* **2.2 Support for Objective 1 & 2 (Cross-Modal Sensor Association) (`/2.0 pts`):**
  * `2.0 pts`: Directly correlates or fuses spaceborne satellite radar (SAR) with AIS radio telemetry for ship matching.
  * `1.0 pt` : Single-modality (SAR-only or AIS-only) that provides essential node features (e.g., oriented bounding boxes, Doppler velocity shift).
  * `0.0 pts`: Unrelated sensor types (optical-only, acoustic, infrared).
* **2.3 Support for Objective 2 & 3 (Anchorage Filtering / Dark Vessels) (`/2.0 pts`):**
  * `2.0 pts`: Directly addresses port congestion false alarms, anchorage loitering context, or detecting non-broadcasting dark vessels.
  * `1.0 pt` : Addresses general maritime anomaly detection without harbor or dark-vessel specificity.
  * `0.0 pts`: Commercial shipping logistics or non-security port scheduling.

---

### Category 3: Research Gap Exposure & Synthesis Power (Max 5.0 Points)
* **3.1 Critical Limitation & Gap Exposure (`/2.0 pts`):**
  * `2.0 pts`: Explicitly reveals a critical unsolved problem that our thesis framework solves (e.g., proves that pairwise distance fails in dense traffic, or proves that AIS-only GNNs cannot catch dark vessels).
  * `1.0 pt` : Identifies general future work without isolating our specific cross-modal graph gap.
  * `0.0 pts`: Completely self-contained or incremental study offering no distinct research gap.
* **3.2 Synthesis Formula Readiness (`/1.5 pts`):**
  * `1.5 pts`: Cleanly enables the 5-step paragraph synthesis formula:  
    $$\text{[IDEA]} \longrightarrow \text{[EVIDENCE]} \longrightarrow \text{[COMPARISON]} \longrightarrow \text{[LIMITATION]} \longrightarrow \text{[CONNECTION]}$$
  * `0.8 pts`: Useful for evidence or comparison only.
  * `0.0 pts`: Cannot be synthesized with other maritime literature.
* **3.3 Panel Defense Armor (`/1.5 pts`):**
  * `1.5 pts`: Provides authoritative defense evidence answering a specific Dean/Panel critique (e.g., justifies the 30-min window, proves Doppler azimuth shift, or defends FPR metrics).
  * `0.8 pts`: General supportive citation.
  * `0.0 pts`: Marginal or generic value.

---

### Category 4: Methodological & Baseline Utility (Max 4.0 Points)
* **4.1 Benchmark Baseline & Comparative Utility (`/2.0 pts`):**
  * `2.0 pts`: Serves as a direct empirical baseline to benchmark against in Chapter 4 (e.g., Hungarian algorithm, ST-GCN, multi-feature association) or provides standard evaluation metrics (FPR, F1).
  * `1.0 pt` : Provides indirect benchmark comparisons.
  * `0.0 pts`: Non-comparable or qualitative study.
* **4.2 Mathematical & Feature Transferability (`/2.0 pts`):**
  * `2.0 pts`: Provides complete mathematical formulas, loss functions, kinematic drift equations, or tested features that we directly adapt in Chapter 3.
  * `1.0 pt` : Provides high-level algorithmic concepts without complete mathematical formulations.
  * `0.0 pts`: Conceptual proposal with no reproducible technical details.

---

## 4. Strict Decision Thresholds

$$\text{Final Score} = \text{Cat}_1 + \text{Cat}_2 + \text{Cat}_3 + \text{Cat}_4 \quad (\text{Max: } 20.0)$$

* 🟢 **$\ge 17.0 / 20.0$ (85%+) $\rightarrow$ TIER 1: CORE THESIS ANCHOR (ACCEPTED)**  
  *Mandatory inclusion.* Essential mathematical foundation, core baseline, or primary justification for our thesis novelty.
* 🟡 **$14.0 - 16.9 / 20.0$ (70%–84%) $\rightarrow$ TIER 2: SPECIALIZED SUPPORTING STUDY (ACCEPTED)**  
  *Contextual citation.* Used in Chapter 1 background, SAR detection node extraction, or Chapter 5 operational limits.
* 🔴 **$< 14.0 / 20.0$ (< 70%) $\rightarrow$ REJECTED / DISQUALIFIED**  
  *Excluded from thesis.* Fails to provide meaningful gaps, uses prohibited sources, or lacks technical depth.

---

## 5. Standard Output Format (When Evaluating Future Papers)

Whenever a candidate paper is provided, the evaluation will strictly output:

```markdown
### 📊 Evaluation Result: [Author Last Name et al. (Year)]
* **Score:** **XX.X / 20.0** ──> [🟢 TIER 1 CORE ANCHOR / 🟡 TIER 2 SUPPORTING / 🔴 REJECTED]
* **Credibility:** [GRADE S / GRADE A / GRADE B / GRADE C / GRADE F] ([XX]% Trust Level)
* **Database Verification:** [Elsevier ScienceDirect / IEEE Xplore / Scopus / WoS]

#### 🔍 Thesis Significance & Gap Analysis:
* **How It Supports the Thesis:** [1-2 sentences on what objective, equation, or baseline it supports]
* **The Critical Gap It Exposes:** [1-2 sentences on what this paper CANNOT do that our GNN solves]

---

### 📋 Ready-to-Copy Topic Abstract Entry:

[First Author Surname], [Initials]., et al. ([Year]). [Article title in sentence case]. [Journal Name in Italics], [volume(issue)], [pages]. [1-2 sentence synthesis summarizing what the paper develops/demonstrates and how it supports our thesis].
[Official DOI URL]
```
