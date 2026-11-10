# Grilling, Tool-Goal Alignment & Delimitations Reference Guide

This reference provides tactical guidelines, probing question banks, and red-flag detection heuristics for executing Phase 1 (Intake) and Phase 2 (Adversarial Grilling) of the `/prompt` skill.

---

## 1. The Intake Framework (Purpose, Content, Context, Tools, Constraints, Delimitations)

When initiating a prompt crafting session, present these foundational dimensions clearly to the user:

| Dimension | Focus | Probing Question |
| :--- | :--- | :--- |
| **1. Purpose** | Operational Role & Outcome | *"What is this prompt specifically FOR? (e.g., system prompt for an autonomous agent, interactive thesis mentor, automated data extraction pipeline, code generator, or evaluation rubric grader)? What concrete outcome must it produce?"* |
| **2. Content** | Deliverables & Algorithms | *"What specific computational task, deliverable, or analysis should the AI generate? What is the core problem being solved?"* |
| **3. Context** | Environment & Data Grounding | *"What is the exact operational or academic setting, who is the evaluator/audience, and what data, papers, or source documents will be fed into it?"* |
| **4. Tools & Execution** | Execution Stack & Capabilities | *"How will the prompt actually deliver on its goals? What tools will the executing AI have access to? (e.g., Code Interpreter / Python REPL, Web Search, File Parser, Custom Function Calling, or strictly Zero-Tool pure reasoning)?"* |
| **5. Constraints** | Hard Operational Limits | *"What are the hard limitations? (e.g., timeline, student compute/hardware like Colab free tier, team technical skills, word budget, model target)?"* |
| **6. Delimitations** | Negative Scope & Exclusions | *"What is strictly declared out-of-scope? What must the prompt explicitly refuse or ignore to prevent scope explosion and maintain feasibility?"* |

---

## 2. Tool-Goal Alignment Rubric

A prompt cannot achieve its goals if its tool configuration is mismatched with its operational expectations. Probe and grill the user on their tool choices based on how the prompt will deliver on its goals:

### A. Mathematical / Empirical Data Goals → Mandate Code Execution
* **Mismatched Prompt**: Asking the AI to analyze a 10,000-row CSV file or compute precision/recall/F1 matrices using mental arithmetic.
* **Failure Mode**: The model will hallucinate numbers, miscalculate sums, and produce plausible-sounding fake metrics.
* **The Pushback**: *"If the goal is to evaluate tabular data or calculate empirical metrics, the prompt MUST mandate a Python REPL or code execution tool. A raw LLM cannot be trusted with manual math."*

### B. Up-to-Date or Scholarly Research Goals → Mandate Search / Document Retrieval
* **Mismatched Prompt**: Asking the AI to cite 2025–2026 literature or check current library versions without web search or attached PDFs.
* **Failure Mode**: The model will hallucinate non-existent paper titles, fake DOIs, or obsolete library syntax.
* **The Pushback**: *"To cite contemporary literature or current APIs, the prompt needs live Web Search or attached source PDFs. If no search tool is available, we must delimit the prompt to pre-cutoff foundational knowledge and disallow specific citation fabrications."*

### C. Closed-Book Synthesis Goals → Strip Out Extraneous Tools
* **Mismatched Prompt**: Giving the AI web search when the goal is to synthesize a specific local university thesis module or private PDF.
* **Failure Mode**: The model will wander across Google search results, diluting the specific rules and syllabus of the local institution.
* **The Pushback**: *"Your goal is strict adherence to your university's guidelines. Enabling web search will contaminate the context. We are disabling search and locking the prompt to a strict closed-book grounding protocol based solely on your uploaded module."*

### D. Production Software Delivery Goals → Mandate Execution / Linters or Delimit to Draft-Only
* **Mismatched Prompt**: Claiming the prompt will generate "bug-free production backend code" without access to a compiler, terminal, or test runner.
* **The Pushback**: *"Without an active terminal/test execution tool, the AI cannot guarantee zero runtime bugs. We must delimit the prompt: it will generate clean, type-hinted code drafts with unit tests, but will include explicit instructions for human/CI verification."*

---

## 3. General Red-Flag Detection & The "Turn-Down" Rubric

When evaluating user ideas during the grilling phase, check against these fatal red flags. If a red flag is present, **do not sugarcoat it—turn down or redirect the concept immediately**.

### Red Flag 1: Data Phantom (Inaccessible / Non-Existent Data)
* **Symptom**: The user wants to train a model on sensitive local hospital data, private banking records, real-time closed traffic cameras, or proprietary government records.
* **Why to Reject**: Undergraduates and capstone teams waste months waiting for data agreements or ethical clearances that never arrive.
* **The Turn-Down Response**: *"This idea depends on data that you cannot guarantee getting in your timeframe. We must turn down this data source and pivot to open-access benchmarks (e.g., Kaggle, Hugging Face, Open Data portals) or synthetic/simulated data."*

### Red Flag 2: Over-Engineering & Architecture Bloat
* **Symptom**: Proposing multimodal transformers, reinforcement learning, or complex custom neural networks for problems where tabular ML (Random Forest, XGBoost) or off-the-shelf YOLO is 10x faster and more interpretable.
* **Why to Reject**: The team will spend the entire timeline debugging GPU CUDA errors and architecture training rather than proving value.
* **The Turn-Down Response**: *"Training a custom transformer here is over-engineering and risks your timeline. A proven classical ML or pre-trained backbone will yield measurable baseline results within weeks. We are cutting the architecture back to [Alternative]."*

### Red Flag 3: Vague or Undelimited Scope ("The Swiss Army Knife")
* **Symptom**: The prompt asks the model to do discovery, system architecture, database design, mobile UI, cloud deployment, and business marketing all at once.
* **Why to Reject**: The AI will produce shallow, hand-waving paragraphs instead of production-grade engineering.
* **The Turn-Down Response**: *"This scope is too broad. We need strict delimitations. The prompt must explicitly state that UI design, deployment, and generic CRUD features are strictly out-of-scope, focusing 100% of the model's compute on [Core ML Task]."*

---

## 4. Final Prompt Delivery & Optional Export Standards

When presenting the finalized prompt:
1. **Direct In-Chat Presentation**: Render the complete prompt directly in the chat session inside a standalone, copy-pasteable markdown code block (` ```text ` or ` ```markdown `).
2. **100% Execution Ready**: The prompt must be completely self-contained, including Purpose, Role, Context & Grounding, Tool Protocols, Negative Delimitations, Task Steps, Evaluation Standards, and built-in Self-Audit Checklist.
3. **Zero Outer Conversational Noise in Prompt Block**: The code block must contain only the raw prompt text with clear section dividers (`================================================================================`).
4. **Explicit Tool Directives**: If tools are configured, explicitly define tool names, exact trigger conditions, parameter standards, and fallback behavior when tools fail.
5. **Optional Workspace Export**: Offer the user the option to save the prompt to a dedicated file (e.g. `final_prompt.txt` or `[purpose]_prompt.txt`) in their workspace if requested.
