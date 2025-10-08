# Architecture Decision Records (ADRs)

This directory contains Architecture Decision Records (ADRs) for the forge-sdd-toolkit project. ADRs document important architectural decisions made during the development and evolution of the toolkit.

## What is an ADR?

An Architecture Decision Record (ADR) is a document that captures an important architectural decision made along with its context and consequences. ADRs help:

- **Document key decisions** and their rationale
- **Provide context** for future team members
- **Track evolution** of architectural thinking
- **Prevent revisiting** already-decided questions
- **Enable informed changes** when requirements evolve

## Format

Each ADR follows this structure:

```markdown
# ADR-XXX: [Title]

**Status**: [Proposed | Accepted | Deprecated | Superseded]
**Date**: YYYY-MM-DD
**Deciders**: [List of people involved]
**Technical Story**: [Brief context]

## Context and Problem Statement
[What problem are we solving?]

## Decision Drivers
[What factors influence this decision?]

## Considered Options
[What alternatives did we evaluate?]

## Decision Outcome
[What did we choose and why?]

## Consequences
[What are the positive and negative impacts?]

## References
[Links to related documents]
```

## Current ADRs

### ADR-001: Three-Level Architecture

**Status**: ✅ Accepted  
**Summary**: Establishes the three-level architecture (Prompts/Templates/Specializations) that structures the entire toolkit.

**Key Decisions**:
- Level 1 (Prompts): Orchestration and workflow control
- Level 2 (Templates): Reusable patterns and knowledge base
- Level 3 (Specializations): Production-ready implementations

**Why Important**: Defines the fundamental structure that enables scalability, reusability, and progressive disclosure.

**Read**: [ADR-001-three-level-architecture.md](./ADR-001-three-level-architecture.md)

---

### ADR-002: SDD Methodology Adoption

**Status**: ✅ Accepted  
**Summary**: Adopts Specification-Driven Development (SDD) as the core methodology with six mandatory sequential stages.

**Key Decisions**:
- Six mandatory stages: IDEATE → ARCHITECT → PLAN → IMPLEMENT → TEST → OPERATE
- Specification document is source of truth
- Full traceability from requirements to code
- Quality gates prevent skipping stages

**Why Important**: Ensures we build the **right thing** (requirements) the **right way** (architecture) **efficiently** (no rewrites).

**Read**: [ADR-002-sdd-methodology-adoption.md](./ADR-002-sdd-methodology-adoption.md)

---

### ADR-003: User-Driven Architectural Decisions

**Status**: ✅ Accepted  
**Date**: 2025-01-05  
**Summary**: Corrects initial auto-decision approach to empower users with comprehensive trade-off analysis.

**Key Decisions**:
- Toolkit presents options, user decides (never auto-decide)
- Comprehensive trade-off analysis (pros/cons/matrix/tree)
- Mandatory pause for user confirmation
- Evidence-based recommendations with clear reasoning

**Why Important**: Users control their architectural destiny, building trust and enabling context-aware decisions.

**Supersedes**: Original design where toolkit auto-decided UI framework choices.

**Read**: [ADR-003-user-driven-decisions.md](./ADR-003-user-driven-decisions.md)

---

## ADR Lifecycle

### Proposed
ADR is drafted but not yet accepted. Open for discussion and feedback.

### Accepted ✅
ADR is approved and actively guiding decisions. Implemented in the codebase.

### Deprecated ⚠️
ADR is no longer relevant due to changing circumstances. Kept for historical record.

### Superseded 🔄
ADR has been replaced by a newer ADR. Points to the superseding ADR.

## Creating a New ADR

### When to Create an ADR

Create an ADR when:
- Making a decision that's **hard to reverse** (architectural choices)
- Choosing between **multiple valid approaches** (trade-offs exist)
- Establishing a **pattern or principle** (will be referenced repeatedly)
- **Correcting a previous decision** (superseding an ADR)
- Deciding something **non-obvious** (requires explanation)

**Don't create an ADR for**:
- Implementation details (variable names, small refactorings)
- Temporary decisions (quick experiments)
- Obvious choices (no alternatives worth considering)

### Process

1. **Copy Template**
   ```bash
   cp ADR-template.md ADR-XXX-your-title.md
   ```

2. **Fill Sections**
   - Context: What problem?
   - Options: What alternatives?
   - Decision: What did we choose?
   - Consequences: What happens?

3. **Propose for Review**
   - Create PR with ADR
   - Tag relevant stakeholders
   - Status: Proposed

4. **Discuss & Refine**
   - Gather feedback
   - Update ADR based on discussion
   - Reach consensus

5. **Accept & Implement**
   - Merge PR
   - Status: Accepted
   - Implement in codebase

6. **Reference in Code**
   ```typescript
   /**
    * Architecture Decision: ADR-001
    * This follows the three-level architecture pattern
    */
   ```

## ADR Naming Convention

Format: `ADR-XXX-short-descriptive-title.md`

Examples:
- ✅ `ADR-001-three-level-architecture.md`
- ✅ `ADR-002-sdd-methodology-adoption.md`
- ✅ `ADR-003-user-driven-decisions.md`
- ❌ `adr001.md` (no leading zero, no description)
- ❌ `architecture-decisions.md` (not numbered)

## Cross-References

### From Code to ADR
```typescript
// See ADR-001 for three-level architecture rationale
import { Level1Prompt } from './prompts';
```

### From ADR to ADR
```markdown
**Related Decisions**:
- ADR-001: Three-Level Architecture (explains structure)
- ADR-002: SDD Methodology (explains process)
```

### From Documentation to ADR
```markdown
For architectural rationale, see:
- [ADR-001: Three-Level Architecture](./structure/docs/ADR/ADR-001-three-level-architecture.md)
```

## Statistics (v0.1.0)

| Metric | Value |
|--------|-------|
| Total ADRs | 3 |
| Accepted | 3 (100%) |
| Proposed | 0 |
| Deprecated | 0 |
| Superseded | 0 |
| Average Length | ~650 lines |
| Total Words | ~12,000 |
| Total Lines | ~1,950 |

## Future ADRs (Planned)

### ADR-004: CLI Design Philosophy (Planned for v0.2.0)
**Topic**: Why minimalist CLI (facilitator) vs LLM-integrated CLI (generator)

### ADR-005: JSON Schema Validation Strategy (Planned for v0.2.0)
**Topic**: Using AJV for document validation vs alternatives

### ADR-006: Prompt Engineering Patterns (Planned for v0.3.0)
**Topic**: Best practices for writing effective Copilot prompts

### ADR-007: Template Organization Strategy (Planned for v0.3.0)
**Topic**: How to organize Level 2 templates as modules grow

## Best Practices

### Writing Good ADRs

**Do** ✅:
- Be specific and concrete (use examples)
- Show alternatives considered (not just chosen option)
- Explain trade-offs honestly (pros AND cons)
- Use data when available (metrics, benchmarks)
- Write for future readers (assume no context)

**Don't** ❌:
- Be vague ("we chose the best option")
- Hide alternatives ("only one way to do this")
- Only show positives (every choice has trade-offs)
- Assume context ("obviously we need this")
- Write for present team only

### Example: Good vs Bad

**Bad** ❌:
```markdown
## Decision
We decided to use three levels because it's better.
```

**Good** ✅:
```markdown
## Decision
We chose a three-level architecture:
- L1: Orchestration (6 prompts, 300-650 lines each)
- L2: Knowledge Base (5+ templates, 400-800 lines each)
- L3: Implementations (1+ specializations, 700-1000 lines)

This beats alternatives (flat, two-level) because:
- Scalability: Can grow to 100+ specializations without chaos
- Reusability: Common patterns shared across use cases
- Progressive disclosure: Simple → intermediate → advanced

Trade-off: More complex mental model (3 levels vs 1 or 2)
Mitigation: Clear documentation in README.md
```

## Tools

### ADR Viewer
```bash
# List all ADRs with status
find . -name "ADR-*.md" -exec head -n 5 {} \;

# Count lines in all ADRs
wc -l ADR-*.md
```

### ADR Template Generator (Future)
```bash
# Future: ADR generation via GitHub Copilot
@forge-architect-adr "Your Decision Title"
# Generates ADR-XXX-your-decision-title.md from template
```

## References

### External Resources
- [ADR GitHub Organization](https://adr.github.io/)
- [Michael Nygard's ADR Template](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [ADR Tools](https://github.com/npryce/adr-tools)
- [ThoughtWorks ADR](https://www.thoughtworks.com/radar/techniques/lightweight-architecture-decision-records)

### Internal Resources
- [Contributing Guide](../../CONTRIBUTING.md) - When to create ADRs
- [SDD Methodology](../../SDD_METHODOLOGY.md) - Decision-making in SDD context
- [Three-Level Architecture](../../README.md#architecture) - Overview of structure

---

**Maintained by**: forge-sdd-toolkit core team  
**Last Updated**: 2025-01-05  
**Questions**: Open GitHub issue with label `adr-question`
