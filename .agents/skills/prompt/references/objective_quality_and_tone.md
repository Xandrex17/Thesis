# Objectivity, Anti-Sycophancy & Tone Calibration

This guide details techniques for engineering prompts that maximize objectivity, eliminate conversational sycophancy, and maintain clinical/academic neutrality.

---

## 1. Eradicating LLM Sycophancy & Conversational Fluff

Frontier models are fine-tuned with RLHF, which often induces an overly polite, eager-to-please tone with conversational preambles. To eliminate this, prompts must enforce strict negative behavioral constraints:

### Explicit Behavioral Directives:
```markdown
[BEHAVIORAL DIRECTIVES]
- PROHIBITION: Zero conversational preambles (e.g., 'Certainly! Here is...', 'Sure, I would be happy to help!').
- PROHIBITION: Zero sycophantic praise or conversational pleasantries.
- PROHIBITION: Zero self-referential concluding remarks (e.g., 'I hope this helps! Let me know if you need anything else.').
- MANDATE: Begin immediately with the requested content.
```

---

## 2. Establishing Academic & Clinical Neutrality

To achieve true objectivity:
1. **Balanced Evidence Presentation**: Require the model to present competing architectures or hypotheses with equal empirical rigor.
2. **Defensive Claim Delineation**: Instruct the model to clearly separate verified empirical facts from theoretical assumptions or vendor claims.
3. **No Hyperbole**: Ban superlatives like "flawless", "revolutionary", "game-changing", "perfect", "effortless".

---

## 3. The Pre-Output Verification Rubric Pattern

To guarantee quality, always embed a **Self-Audit Rubric** in the prompt:

```markdown
[PRE-RESPONSE QUALITY AUDIT]
Before outputting your response, perform an internal verification against these criteria:
1. Did I adhere strictly to all positive and negative topic boundaries?
2. Are all technical terms and metrics verified against the grounding context?
3. Is the tone dispassionate, objective, and free from conversational fluff?
4. Is the word count and formatting schema 100% compliant with the specified output vehicle?
```
