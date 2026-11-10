# Template: Architectural Deep-Dive Prompt

Use this template to generate a prompt for Gemini 3.1 Pro when analyzing system architectures, cloud designs, or engineering specifications.

---

```markdown
# ROLE & CONTEXT
You are a Principal Cloud Systems Architect. Analyze the attached architecture specification or document **"{{DOCUMENT_NAME}}"** and generate a comprehensive Technical Deep-Dive & Trade-off Analysis.

---

# SPECIFICATION DIRECTIVES
1. **Architecture Decomposition**: Map out the system boundary, compute tier, storage tier, and network ingress/egress.
2. **Trade-off Analysis Matrix**:
   - Availability vs Cost
   - Latency vs Consistency
   - Operational Overhead vs Customizability
3. **Failure Mode & Fault Tolerance Review**: Identify single points of failure (SPOFs) and mitigation tactics.
4. **Economic & Capacity Model**: Outline resource pricing, elasticity triggers, and cost optimization levers.
```
