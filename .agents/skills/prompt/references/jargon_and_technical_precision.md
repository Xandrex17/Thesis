# Technical Lexicon & Jargon Governance Guide

This guide establishes standards for technical vocabulary, domain jargon, and nomenclature precision in prompt engineering.

---

## 1. The Principle of Lexical Precision

Technical jargon is valuable when it **compresses complex, precise concepts into exact terms**, but harmful when used as vague buzzword fluff.

### Good Jargon vs. Buzzword Fluff:
| Concept | Precise Technical Lexicon (Enforce) | Vague Buzzword Fluff (Ban) |
| :--- | :--- | :--- |
| **Fault Tolerance** | "Active-active multi-region failover with sub-second RTO/RPO" | "Resilient next-gen cloud paradigm" |
| **Financial Analysis** | "Shift from upfront CapEx to variable OpEx with volume tiered pricing" | "Cost-effective digital transformation" |
| **Distributed Systems** | "Linearizable consistency under Paxos/Raft consensus" | "Seamless robust synergy across nodes" |
| **Database Performance** | "B-Tree index leaf page splits causing random I/O bottlenecks" | "Slow database data pipeline issues" |

---

## 2. Jargon Calibration Rules for Prompts

When constructing prompts, inject explicit **Lexicon Governance Directives**:

```markdown
[LEXICAL & TECHNICALITY DIRECTIVES]
1. Vocabulary Tier: Tier 3 (Advanced Computer Science & Systems Engineering).
2. Nomenclature Standards: Use official, canonical terms (e.g., AWS Service Control Policies, not 'AWS permission rules').
3. Acronym Protocol: Expand all non-standard acronyms upon first usage; standard industry acronyms (CPU, RAM, API, JSON, TCO) may be used directly.
4. Anti-Buzzword Constraint: Avoid generic marketing phrases ('paradigm shift', 'synergy', 'game-changing', 'state-of-the-art', 'next-generation').
```

---

## 3. Domain Taxonomy Libraries

### Computer Science & Distributed Systems:
- *Terms*: Idempotency, Amortized Complexity, CAP Theorem, Eventual Consistency, Non-blocking I/O, Cache Invalidation, Deadlock Prevention, Byzantine Fault Tolerance.

### Cloud Economics & FinOps:
- *Terms*: Capital Expenditure (CapEx), Operational Expenditure (OpEx), Total Cost of Ownership (TCO), Consolidated Billing, Reserved Instance Amortization, Blended Rates, Egress Data Aggregation.

### AI & Prompt Engineering:
- *Terms*: Semantic Drift, In-Context Learning, Few-Shot Prompting, Multimodal Spatial Grounding, Hallucination Boundary, Token Budgeting, Temperature Calibration.
