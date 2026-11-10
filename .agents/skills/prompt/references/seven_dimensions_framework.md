# The 7-Dimensional Prompt Precision Framework (7-DPF)

This reference provides a deep-dive specification and calibration manual for the 7 core dimensions of prompt engineering.

---

## Dimension 1: Topic Delineation & Boundary Scope

The Topic dimension sets the bounding box for the LLM's attention. Without strict positive and negative boundaries, LLMs suffer from semantic drift.

### Calibration Checklist:
- **Core Subject Definition**: What specific concept, system, or theory is being addressed?
- **Explicit Inclusions (Positive Scope)**: List 3–5 mandatory subtopics that must be covered.
- **Explicit Exclusions (Negative Scope)**: List specific related topics that must NOT be discussed (e.g., "Focus strictly on AWS Cloud Economics; do not explain general AWS EC2 instance sizing or VPC networking").
- **Depth Level**: Conceptual overview vs. architectural implementation vs. mathematical proof.

---

## Dimension 2: Context & Grounding

Context anchors the prompt to external realities, source artifacts, and operational constraints.

### Grounding Types:
| Grounding Level | Description | Prompt Directive Pattern |
| :--- | :--- | :--- |
| **Strict Closed-Book (Zero Extrapolation)** | The model must only use the provided document. | `"All facts, numbers, tiers, and definitions MUST be strictly derived from the attached document [file.pdf]. If a detail is missing, state 'Not specified in source material'."` |
| **Hybrid Grounding** | Grounded in source document, but augmented by domain theory. | `"Use the attached specification as the primary system model, but apply standard IEEE/RFC theoretical principles for comparative evaluation."` |
| **Open Domain with Environmental Anchoring** | Open knowledge, but constrained to a specific simulated environment. | `"Simulate a real-world enterprise environment undergoing a hybrid-cloud migration under strict GDPR compliance."` |

---

## Dimension 3: Content Quality & Analytical Rigor

Quality is defined by information density, analytical substance, and factual verifiability.

### Quality Calibration Controls:
1. **Signal-to-Noise Ratio (SNR)**:
   - Prohibit conversational filler ("As we all know", "It is important to remember").
   - Prohibit tautological statements ("Cost optimization is about optimizing costs").
2. **First-Principles Reasoning**:
   - Mandate causality: Require "Why" and "How" alongside "What".
   - Mandate trade-offs: Require every recommendation to state its associated cost, latency, or complexity trade-off.
3. **Verification Rubric**:
   - Embed an internal audit checklist at the end of the prompt that forces the model to review its own output against stated criteria before rendering.

---

## Dimension 4: Audience Calibration

Aligning output with audience expectations prevents the response from being either too elementary or incomprehensibly abstruse.

### Audience Archetypes:
- **Academic Professor / Evaluator**: Expects rigorous academic vocabulary, theoretical grounding, formal structure, and adherence to assignment rubrics.
- **Principal Software Architect**: Expects trade-off analyses, failure mode breakdowns, latency/concurrency considerations, and clean pseudocode/diagrams.
- **C-Suite / Executive**: Expects financial impact (CapEx/OpEx, ROI, TCO), risk assessment, executive summaries, and bulleted takeaways.
- **Undergraduate / Peer Student**: Expects clear conceptual clarity, logical scaffolding, intuitive analogies, and pedagogical precision.

---

## Dimension 5: Tone & Objectivity

Tone defines the emotional distance, posture, and neutrality of the response.

### Tone Spectrum:
```text
[Pedagogical / Explanatory] <---> [Objective Academic] <---> [Authoritative Engineering] <---> [Forensic / Clinical Audit]
```

### Anti-Sycophancy & Objectivity Directives:
- **Zero Sycophancy**: Never praise the user's question ("Great question!", "That's a fascinating topic!").
- **Dispassionate Analysis**: Use neutral, evidence-based phrasing rather than enthusiastic marketing copy.
- **Negative Finding Reporting**: Explicitly state system vulnerabilities, economic disadvantages, and methodological flaws without softening language.

---

## Dimension 6: Expression & Delivery Mechanics

Expression governs formatting, syntax rhythm, document structure, and output vehicle compatibility.

### Target Format Archetypes:
1. **Google Docs / University Submission (Zero-Markdown Plain Text)**:
   - Headings formatted as plain UPPERCASE strings on their own line.
   - Plain numbered lists (1. 2. 3.) or simple dashes (-).
   - Absolute prohibition of `#`, `**`, `*`, `_`, `|`, ````.
2. **Technical Markdown (GitHub / Documentation)**:
   - Proper `#` header hierarchies (H1 -> H2 -> H3).
   - Markdown comparison tables with explicit column headers.
   - GitHub alert callouts (`> [!NOTE]`, `> [!WARNING]`, `> [!IMPORTANT]`).
   - Syntax-highlighted code fences (` ```typescript `).
3. **Structured Data Payloads**:
   - Strict JSON/YAML schemas with type annotations and zero markdown wrappers.

---

## Dimension 7: Technicality of Words & Jargon Governance

Governs vocabulary density, domain taxonomy, and acronym handling.

### Vocabulary Density Tiers:
- **Tier 1 (General)**: Accessible to non-specialists; avoids domain jargon.
- **Tier 2 (Applied Practitioner)**: Uses standard industry terminology (e.g., latency, caching, database indexing, compute instance).
- **Tier 3 (Advanced Specialist)**: Uses rigorous domain-specific vocabulary (e.g., idempotency, consensus algorithms, CapEx amortization, write-ahead logging).
- **Tier 4 (Theoretical / Research Scholar)**: Uses specialized academic and mathematical nomenclature (e.g., asymptotic bounds, deterministic finite automata, non-blocking I/O multiplexing).
