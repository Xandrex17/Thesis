---
name: paper-critic
description: "Critique research papers and thesis proposals with evidence-based scores, assess feasibility and writing quality, and trace revisions against professor or reviewer comments. Use for whole-paper reviews, section reviews, and revision-compliance audits."
---

# Paper Critic

Give a candid, actionable academic review. Judge the submitted version and its stage of research; separate a well-written plan from demonstrated feasibility. Do not rewrite the manuscript unless asked. Proposed replacement passages may be included in the review without editing the source.

Read [references/rubric.md](references/rubric.md) before scoring. Use the user's institutional rubric when supplied, and disclose any changes to the default weights.

## Inputs and evidence

- Identify the exact manuscript version, its stage (proposal, progress report, completed study), and review scope. Label section-only assessments as such; do not assign an unseen whole paper a score.
- Read the complete submitted paper, including diagrams, tables, appendices, and references. Inspect relevant PDF pages visually when extraction cannot establish a layout or diagram finding. Cite PDF page numbers and section names; distinguish them from printed numbering.
- For screenshots of comments, transcribe the actionable requests faithfully. Separate professor requirements from your own suggestions. Locate an available local image before requesting a missing attachment. If comments remain unreadable, continue the paper review and mark the compliance audit pending; never invent requirements.
- Record unavailable evidence as unverified, not false. A precise count, confident statement, or citation is not itself proof that data were acquired, an experiment ran, or access was granted. Do not claim to inspect files or execute models that you did not inspect or run.
- Verify consequential external claims with primary documentation when needed, especially dataset schemas/access, benchmark compatibility, current software or rules, and disputed scientific claims. Link the supporting source beside the finding. Clearly distinguish manuscript evidence, external verification, and reviewer inference. Do not label an unlocated reference fabricated.

## Review decisions

1. Map the chain from research problem to objectives, required inputs, method, labels, evaluation, and expected outputs. Identify dependencies whose failure changes what can be claimed.
2. Check internal consistency across the entire manuscript. Compare definitions, numbers, labels, thresholds, source names, tense, diagram branches, evaluation rules, and prototype behavior. A corrected framework does not resolve contradictory text elsewhere.
3. For feasibility, ask whether the actual accessible data contain the fields, resolution, coverage, and independent labels needed by the proposed method. Distinguish scene counts, detections, vessels, and dependent candidate edges. Identify a feasible minimum study and contingencies without replacing the user's research topic.
4. For evaluation, check label independence, ambiguity handling, leakage, train/validation/test boundaries, class balance, metric denominators, uncertainty, baseline task equivalence, and synthetic versus observational evidence. In ML papers, inspect preprocessing and graph-neighbor leakage as well as train/test row separation.
5. Score all applicable rubric dimensions from 0 to 10, with higher always better. For every score give manuscript evidence, the reason for deductions, and a concrete improvement. Mark confidence and evidence limitations. Calculate the weighted total accurately; never present it as an official grade or calibrated probability of acceptance.
6. Assess formulaic or inflated prose through observable wording: repetition, vague benefits, jargon without operational meaning, unsupported certainty, and inconsistent technical register. Preserve necessary domain terms. Never infer AI authorship or fabricate detector results, plagiarism scores, or human/AI percentages. Call the dimension “Specificity and freedom from formulaic prose (AI-slop review).”

## Professor-comment traceability

Assign each actionable request an ID. Record: request, acceptance criterion, manuscript response and location, remaining gap, status, and next evidence or revision needed.

Use these statuses:
- **Not addressed:** No meaningful response found.
- **Partially addressed:** Some required elements remain absent.
- **Addressed in plan:** A coherent proposed response exists, but requested demonstration is not supplied.
- **Demonstrated:** Relevant evidence supports the acceptance criterion at the manuscript's current stage.
- **Contradicted:** Another passage, figure, or output undermines the response; cite both locations. Record any partial progress as well.

Do not treat “Addressed in plan” as full compliance when the professor explicitly asks to demonstrate or verify something. Keep comment compliance separate from overall manuscript quality; good grammar cannot cancel a missing dataset or unreliable labels. If comments conflict, surface the conflict rather than silently choosing one.

## Deliverable

Produce a self-contained review containing:
- Overall editorial verdict, weighted score, scope, and main limitations.
- Scorecard with evidence and per-dimension confidence.
- Professor-comment traceability table, when comments exist.
- Section-by-section findings, including strengths worth preserving.
- Prioritized issues with stable IDs, severity, location, evidence, consequence, and an actionable fix or acceptance check. Use Critical for a core claim blocked by missing dependencies; Major for validity or reproducibility problems; Moderate for consequential clarity defects; Minor for local proofreading.
- A small set of representative grammar and prose fixes, preserving technical meaning.
- A realistic revision order and defense questions tied to actual gaps.

Use the same issue IDs when one problem affects multiple dimensions; distinguish its consequences rather than presenting it as several unrelated discoveries. Preserve the manuscript and original comments. For file-based reviews, save a Markdown report beside the manuscript or in its established review folder, and link it in the final response. Create a PDF only if requested. On later revisions, compare stable issues and changed evidence using the same rubric; do not award improvement merely because wording changed.
