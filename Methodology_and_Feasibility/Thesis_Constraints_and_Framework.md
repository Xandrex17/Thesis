# CS Thesis Operational Framework & Constraints Specification

> **Degree Program:** Bachelor of Science in Computer Science (BSCS) — CS Thesis 1 & Thesis 2  
> **Institution Alignment:** Batangas State University (BatStateU) Curriculum Guidelines  
> **Core Theme:** Meta-Learning Architectures Constrained by the **10th Man Rule** (Devil’s Advocate / Dissenting Mechanics)  
> **Team Composition:** Three (3) 4th-Year Undergrad CS Students  
> **Target Timeline:** 3 Months to Pre-Oral Defense (with Functional POC) + 4 Months to Final Defense (7 Months Total)  
> **Budget & Compute:** ₱0 Direct Cost | Google Colab (Free T4/V100) / Kaggle Notebooks (Dual T4)  

---

## 1. Context & Feedback Directives (Adviser Guidance Audit)

From the official panel/adviser directive (`Screenshot 2026-09-07 133529.png`), previous proposals were rejected or sent back for revision due to the following structural critique:

> *"While your current ideas are relevant and feasible, they are still largely focused on applying, comparing, or fine-tuning existing models.*  
> *For a BS Computer Science thesis, I would like to see a clearer **computational contribution or methodological novelty**—something that proposes an improvement, adaptation, optimization, or new approach rather than simply determining which existing model performs better.*  
> *Please also remember that a **functional POC (Proof of Concept)** is required. A POC is a working prototype that demonstrates that your proposed method or model can actually be implemented and produce the intended output. It does not need to be a complete system, but it should clearly demonstrate the thesis contribution."*

### Key Mandates Derived from Feedback:
1. **No "Off-the-Shelf" Application:** Simply taking an existing model (e.g., vanilla MAML, ResNet, BERT, or YOLO) and running it on a dataset is an IT or applied engineering project, not a Computer Science thesis.
2. **Methodological / Computational Novelty:** The study must modify the mathematical formulation, loss function, gradient update rule, attention gating, or latent task representation.
3. **Mandatory Functional POC at Pre-Oral (Month 3):** The pre-oral panel will not accept slides or wireframes alone. The team must present a working prototype running on a benchmark dataset demonstrating the mathematical novelty producing empirical output.

---

## 2. Theoretical Formulation: The "10th Man Rule" in Meta-Learning

### What is the 10th Man Rule?
Originating in intelligence red-teaming (and popularized in strategic decision theory), the **10th Man Rule** states:  
*If nine people agree completely on a premise or course of action, it is the mandatory duty of the tenth person to dissent, challenge consensus assumptions, and vigorously investigate failure modes to prevent catastrophic groupthink.*

### How Does This Translate to Meta-Learning (Learning-to-Learn)?
In machine learning, Meta-Learning algorithms (e.g., MAML, Reptile, Prototypical Networks, Meta-SGD) optimize an overarching meta-learner across a distribution of few-shot tasks $p(\mathcal{T})$. However, standard meta-learners suffer from severe computational vulnerabilities:

1. **Meta-Overfitting & Consensus Collapse:** When tasks share common feature correlations, standard meta-learners converge on majority representations. If 9 tasks or 9 learner heads identify an easy shortcut, the model ignores rare edge cases.
2. **Overconfident Few-Shot Inferences:** In $K$-shot learning ($K \in \{1, 5\}$), models form class prototypes or update inner-loop weights based on tiny sample sizes. High unanimity among support samples often leads to catastrophic failure on ambiguous, out-of-distribution (OOD), or adversarial queries.
3. **Groupthink in Ensembles and Multi-Task Meta-Losses:** Averaging gradients across task batches dampens minority signals.

```
                    ┌─────────────────────────────────────────────────────────┐
                    │               Few-Shot Task Batch p(T)                 │
                    └──────────────────────────┬──────────────────────────────┘
                                               │
                                               ▼
         ┌─────────────────────────────────────┴─────────────────────────────────────┐
         │                                                                           │
         ▼                                                                           ▼
┌─────────────────────────────────┐                         ┌─────────────────────────────────┐
│     9 "Consensus" Observers     │                         │   The "10th Man" Dissent Unit   │
│  (Majority Gradient / Prototypes)│                         │ (Contrarian Head / Stress Loss) │
└────────────────┬────────────────┘                         └────────────────┬────────────────┘
                 │                                                           │
                 │   High Consensus / False Confidence                       │   Orthogonal / Adversarial
                 │   [Agreement Metric S_agree -> 1.0]                       │   Perturbation Probe
                 ▼                                                           ▼
         ┌───────────────────────────────────────────────────────────────────────────┐
         │             Dissent-Gated Meta-Optimization / Arbitration                │
         │  If Consensus is Unanimous -> Penalize Overconfidence via Dissent Loss    │
         │  Forces Model to Adapt to Edge Cases, Atypical Features & OOD Anomalies   │
         └─────────────────────────────────────┬─────────────────────────────────────┘
                                               │
                                               ▼
                    ┌─────────────────────────────────────────────────────────┐
                    │      Robust Meta-Adapted Parameters / Calibrated Output │
                    └─────────────────────────────────────────────────────────┘
```

### The Methodological Novelty Opportunity:
By embedding the **10th Man Rule** into Meta-Learning as a computational constraint, students introduce a verifiable algorithmic contribution:
* **Inner-Loop Orthogonal Gradient Constraints:** Penalizing gradient directions that align too completely with the majority support-set features.
* **Dissent-Regularized Prototypical Loss:** Adding a contrarian metric branch that explicitly seeks anti-consensus feature subspaces.
* **Devil's Advocate Task Augmentation:** A dynamic meta-curator that injects hard counter-factual support instances whenever inner-loop loss falls below a complacency threshold.
* **Dissent-Gated Epistemic Uncertainty:** Flagging queries where consensus is artificially high despite high latent feature entropy.

---

## 3. Departmental & Academic Alignment: The F.I.T. Principle

As specified in `CS_Thesis_Topic_Module.pdf`, every candidate topic must pass the **F.I.T. Test**:

| Dimension | F.I.T. Criterion | How Our Meta-Learning + 10th Man Topics Comply |
| :--- | :--- | :--- |
| **F — Feasible** | *Can you finish it using the time, data, people, tools, budget, and computing resources available?* | • Uses 100% open-access, pre-cleaned benchmark datasets (₱0 acquisition cost).<br>• Scaled to run on Google Colab (T4 GPU) or Kaggle (2x T4 GPU) within standard timeout limits.<br>• Clear 3-person task division with zero dependence on slow institutional bureaucracy or external sensor hardware. |
| **I — Important & Interesting** | *Is the problem worth investigating? Will the result be useful or add knowledge?* | • Solves critical reliability and security failures in AI: rare disease misdiagnosis, zero-day cyber attacks, hallucinated misinformation, sensor blindspots, and fraud evasions.<br>• Directly contributes a reproducible algorithmic defense against consensus bias in few-shot regimes. |
| **T — Testable** | *Can you evaluate the proposed method and produce measurable evidence?* | • Evaluated using rigorous mathematical metrics: Few-shot Accuracy, F1-score, Expected Calibration Error (ECE), OOD Detection AUROC, and Ablation Impact ($\Delta$ Accuracy with/without 10th Man constraint).<br>• Directly benchmarked against standard baselines (Vanilla MAML, ProtoNet, Deep Ensembles, MC-Dropout). |

---

## 4. Dataset Acquisition & Feasibility Guidelines

To ensure the 3-month pre-oral deadline is met without delays:
* **Zero Bureaucracy:** Strictly avoid datasets requiring hospital Institutional Review Boards (IRB), non-disclosure agreements (NDAs), or physical hardware sensor deployment.
* **Instant Ingestion:** Datasets must be downloadable directly from reputable repositories:
  * Kaggle Datasets (API accessible)
  * Hugging Face Datasets Hub (`load_dataset`)
  * UCI Machine Learning Repository
  * PhysioNet Open Access Databases
  * Zenodo / OpenML
* **Scale-Controlled:** Formulate episodic few-shot tasks ($N$-way $K$-shot where $N \in \{2, 5\}$, $K \in \{1, 5, 10\}$) so training episodes converge within 2–4 hours on a free Colab T4 instance.

---

## 5. Team Division of Labor (3 Undergrad 4th-Year CS Students)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        BSCS THESIS TRIAD COLLABORATION MODEL                           │
└────────────────────────────────────────────────────────────────────────────────────────┘
          │                                 │                                 │
          ▼                                 ▼                                 ▼
┌──────────────────┐              ┌──────────────────┐              ┌──────────────────┐
│     MEMBER 1     │              │     MEMBER 2     │              │     MEMBER 3     │
│  Data Architect  │              │  ML / Algorithm  │              │  Evaluation & UI │
└─────────┬────────┘              └─────────┬────────┘              └─────────┬────────┘
          │                                 │                                 │
          ├► Download & clean open data     ├► Code Meta-Learning framework   ├► Benchmarking ladder
          ├► Format N-way K-shot episodes   ├► Implement 10th-man math        ├► Ablation experiments
          ├► Split meta-train/val/test      ├► Loss function & backprop       ├► Metrics (ECE, AUROC, F1)
          └► Manage batching pipelines      └► Colab training optimization    └► Streamlit/Gradio POC UI
```

---

## 6. Milestone Schedule: 7-Month Roadmap to Defense

| Phase | Milestone / Objective | Key Activities & Deliverables | Expected Output |
| :--- | :--- | :--- | :--- |
| **Month 1** | **Topic Approval & Literature Mining** | Query IEEE Xplore, ACM Digital Library, Scopus, SpringerLink; finalize problem formulation and mathematical objective. | Approved Chapter 1 & 2 draft; BibTeX literature corpus. |
| **Month 2** | **Data Episodic Pipeline & Core Formulation** | Download Kaggle/HuggingFace datasets; construct $N$-way $K$-shot generator; build baseline MAML / ProtoNet. | Working PyTorch DataLoader emitting episodic support/query tensors. |
| **Month 3** | **10th-Man Implementation & Pre-Oral POC** | Implement 10th-man loss/branch; run preliminary validation; build interactive Streamlit dashboard. | **Functional POC Delivered**; Pre-Oral Defense passed. |
| **Month 4** | **Panel Feedback Integration & Scaling** | Refine loss hyperparameters ($\lambda_{\text{dissent}}$); expand meta-task variety; verify compute bounds. | Calibrated training pipeline; revised methodology chapter. |
| **Month 5** | **Comprehensive Ablation Studies** | Systematically disable the 10th-man unit; test against varying consensus thresholds; quantify failure cases. | Full ablation matrices and divergence plots. |
| **Month 6** | **Comparative Baseline Benchmarking** | Run head-to-head empirical trials against standard SOTA meta-learners and ensembles. | Statistical significance tests, confusion matrices, AUROC plots. |
| **Month 7** | **Final Manuscript & Defense Execution** | Complete Chapters 4 & 5; run Turnitin similarity check; rehearse presentation; deliver defense. | **Passed Final Oral Defense**; publication-ready paper. |

---

## 7. Definition of the Pre-Oral POC (Month 3 Deliverable)

A self-contained Python / PyTorch notebook and an interactive Streamlit or Gradio UI where a panelist can:
1. Select an episodic few-shot test task (e.g., 5-way 1-shot sample).
2. Inspect the model's prediction with the **10th Man Dissent Module disabled** (showing consensus collapse / false overconfidence on edge cases).
3. Activate the **10th Man Dissent Module** (demonstrating how the contrarian mechanism corrects the prediction, flags epistemic uncertainty, or mitigates misclassification).
4. View immediate execution metrics proving computational feasibility.
