# Gemini 3.1 Pro Prompt Engineering Reference Architecture

This guide details the internal capabilities, behavioral heuristics, and optimization strategies for getting maximum reasoning and formatting precision out of **Gemini 3.1 Pro**.

---

## 1. Model Strengths & Characteristics

| Capability | Gemini 3.1 Pro Behavior | Optimization Strategy |
| :--- | :--- | :--- |
| **Multimodal PDF Understanding** | Native OCR, visual diagram interpretation, slide-by-slide spatial comprehension. | Reference specific slide headers and section labels in prompt anchors. |
| **Context Window (Up to 2M Tokens)** | Ingests full textbooks, multi-hundred slide decks, and codebases in a single turn. | Anchor instructions to specific chapters/modules to prevent drifting. |
| **Structured Output & Tables** | Superior Markdown table generation, nested lists, and strict formatting tags. | Provide explicit table column headers and row schema definitions. |
| **Negative Constraint Adherence** | Follows negative rules (e.g., "Do not mention X", "Do not exceed Y words") with high fidelity. | Use capitalized directive keywords: `MANDATORY`, `STRICT NEGATIVE CONSTRAINT`. |

---

## 2. Advanced Prompt Engineering Patterns

### Pattern A: Grounded Knowledge Extraction (Anti-Hallucination)
When prompting Gemini with an uploaded PDF or slide deck:
```markdown
[SOURCE GROUNDING DIRECTIVE]
- You are provided with the attached file: [filename.pdf].
- ALL claims, tier levels, feature sets, numbers, and definitions MUST originate exclusively from this source.
- If a concept is not explicitly mentioned in the document, omit it or state: "Not specified in source material."
```

### Pattern B: The Strict Pagination Budgeter
For academic assignments requiring an exact page count (e.g. 2 pages):
```markdown
[PAGINATION & WORD BUDGET CONSTRAINTS]
- Total Word Budget: 950 - 1,100 words (Calibrated to exactly 2 printed pages with 1-inch margins, 11pt font, single-spaced).
- Page 1 Allocation (~500 words): [Sections 1 & 2]
- Page 2 Allocation (~550 words): [Sections 3, 4 & 5]
- Include a visible page separator: `--- 📄 PAGE 2 BREAK ---`
```

### Pattern C: Multi-Tier Matrix Formatting
When comparing plans, tiers, or features:
- Always define exact columns: `| Tier / Feature | Target Audience | Response Time (Severity 1) | Key Deliverables & Access | Price Model |`
- Instruct Gemini to use concise cell values (no multiline wordy paragraphs inside cells).
