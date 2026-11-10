# Scoring rubric

Use these defaults for technical research papers and proposals. Research-stage expectations govern the evidence: a proposal needs an executable, supported plan, not completed-study results. A request from a professor for a feasibility demonstration is a separate acceptance condition.

| Dimension | Weight | Assess |
|---|---:|---|
| Grammar and mechanics | 6 | Syntax, agreement, punctuation, citation integration, consistent tense and terminology. |
| Clarity and delivery | 8 | Logical flow, readable explanations, appropriate detail, useful figures, manageable repetition. |
| Content quality and completeness | 8 | Relevant substance, operational definitions, appropriate coverage, qualifications and limitations. |
| Problem, contribution, and significance | 6 | Specific research gap, justified contribution, defensible novelty, benefits proportional to evidence. |
| Methodological and technical rigor | 12 | Reproducible pipeline, correct assumptions, necessary features, specified decision and conflict rules. |
| Data feasibility | 12 | Actual access status, resolution, schema, coverage, sample adequacy, permissions and fallback. |
| Model and resource feasibility | 8 | Compatibility of data and architecture, available hardware, dependency and compute budget, implementable minimum. |
| Validation and statistical soundness | 14 | Independent reference labels, uncertainty, fair baselines, leakage prevention, metrics, synthetic/real separation. |
| Scope and objective alignment | 8 | Achievable deliverables, matched objectives and methods, dependency management, realistic limits. |
| Internal consistency and reproducibility | 8 | Agreement across text, diagrams and outputs; traceable counts, settings, partitions and procedures. |
| Evidence and citation integrity | 6 | Traceable references, claims supported by suitable sources, correct attribution, reproducible empirical assertions. |
| Specificity and freedom from formulaic prose (AI-slop review) | 4 | Concrete explanations, economical prose, restrained certainty, natural phrasing without generic claims or needless jargon. |

Weights total 100. Weighted score out of 100 is the sum of each dimension's weight multiplied by its score and divided by 10. Retain at most one decimal internally and round the displayed overall score to a whole number. Show the raw scorecard so the calculation is auditable. If a dimension genuinely does not apply, explain why and rescale the applicable weights; unavailable evidence is not automatically “not applicable.”

## Score anchors

- **9–10:** Convincing and traceable at the current research stage; remaining changes are minor.
- **7–8:** Sound overall, with specific omissions that are unlikely to overturn the design.
- **5–6:** Plausible but substantial revision or supporting evidence is needed.
- **3–4:** Important weaknesses or contradictions leave the dimension poorly supported.
- **1–2:** Fundamental requirements are largely unmet.
- **0:** Applicable requirement entirely absent or demonstrably unusable. Explain explicitly.

Scores are editorial judgments, not measurements of authorship, validity probabilities, or official grades. Confidence is High when direct manuscript evidence establishes the finding, Medium when a reasonable inference is required, and Low when incomplete or unreadable materials constrain assessment. Confidence concerns the assessment, not the author's competence.

Suggested verdicts: 85–100 near-ready; 70–84 targeted revision; 50–69 major revision; below 50 substantial redesign or evidence recovery. Any unresolved core dependency must also appear in the verdict regardless of the total. Do not imply that a score predicts panel approval.

## Proposal-specific acceptance checks

- **Data:** Name the exact source/product and distinguish identified, requested, approved, downloaded, inspected, and usable. Ask for a small retrieved sample with timestamps, fields, area/time coverage, missingness, and a reproducible query or manifest. An open-access portal is not proof of access to every field or sampling interval.
- **Model:** Distinguish architectural description, runnable smoke test, measured benchmark, and validated model. A small synthetic graph can demonstrate code execution but cannot demonstrate real-data accuracy. Do not require expensive full training when a modest test answers the professor's request.
- **Labels:** Separate independently corroborated cases, expert-reviewed provisional labels, provider classifications, and artificial masking. An independent record source is not automatically an independently verified cross-sensor pair. Measure annotator agreement before adjudication; use a target as a target, not a guaranteed result.
- **Evaluation:** Define positive/negative units for every task; edge association and SAR-node discrepancy have different denominators. Split before fitting transforms or tuning thresholds. Account for dependent observations within scenes and vessels when reporting uncertainty. Candidate edges increase optimization examples but do not create independent scenes or independent positive cases.
- **Scope:** Specify the smallest complete study, optional extensions, resource/access dependencies, and what will be reported if verification or sample sizes remain inadequate. A proposed restriction is useful only if all diagrams and outputs obey it.

## Prose audit boundaries

Quote short manuscript examples and explain their reader-facing defect. A broad significance paragraph may be repetitive without being wrong; a claim of guaranteed performance is a scientific overclaim as well as a prose issue. Do not equate advanced terminology, non-native English, or formal academic style with AI authorship. Offer natural rewrites without adding facts or promises.
