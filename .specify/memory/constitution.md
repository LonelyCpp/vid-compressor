<!--
Sync Impact Report:
- Version: 1.0.0 → 1.1.0 (added technology stack principles)
- Principles: Added Principle 6 (Next.js/React), Principle 7 (shadcn UI)
- Added sections: None (principles added to existing section)
- Templates requiring updates: ⚠ pending (templates directory not yet created)
- Follow-up TODOs: None
-->

# Project Constitution

**Project:** vid-compressor  
**Version:** 1.1.0  
**Ratified:** 2025-01-27  
**Last Amended:** 2025-01-27

## Project Identity

vid-compressor is a hobby project focused on building a video compression tool. The project prioritizes speed of iteration and working output over enterprise-grade processes and architectural perfection.

## Principles

### Principle 1: Ship Fast, Iterate Faster

**Rule:** Prefer shipping working code quickly over perfect solutions. If something works well enough for the current use case, ship it. Refactor only when there's a concrete problem to solve, not theoretical future needs.

**Rationale:** Speed of iteration is the primary constraint. Working code that solves the problem today is more valuable than perfect code that solves hypothetical problems tomorrow. This is a hobby project, not production infrastructure.

### Principle 2: Minimal Process Overhead

**Rule:** Avoid adding process, documentation, or ceremony unless it directly accelerates development. No mandatory code reviews, extensive planning docs, or approval workflows. Make decisions quickly and move on.

**Rationale:** Process exists to serve output, not the other way around. For a solo hobby project, process overhead slows iteration without providing benefits. Trust quick judgment calls.

### Principle 3: Practical Over Perfect

**Rule:** Choose the simplest solution that works. Prefer libraries over custom implementations, existing patterns over novel architectures, and quick fixes over comprehensive refactors. Technical debt is acceptable if it doesn't block progress.

**Rationale:** Perfect is the enemy of done. A working feature with technical debt is better than a perfect feature that never ships. Refactor when debt actually causes problems, not preemptively.

### Principle 4: Output-Driven Decisions

**Rule:** Every decision must answer: "Does this help ship faster or improve the end result?" If the answer is no, skip it. Prefer tools and patterns that reduce friction, even if they're not "best practice" by enterprise standards.

**Rationale:** Focus on what users experience, not internal code quality metrics. A feature that works is better than code that's beautifully structured but incomplete. Measure success by shipped features, not code coverage or architecture scores.

### Principle 5: Quick Decisions, Easy Reversals

**Rule:** Make technology and design decisions quickly. Prefer reversible choices (e.g., library selection, file structure) over irreversible ones. If a decision proves wrong, change it immediately rather than working around it.

**Rationale:** Analysis paralysis kills iteration speed. Most decisions in a hobby project are easily reversible. It's faster to try something and pivot than to research extensively upfront. Wrong decisions teach faster than no decisions.

### Principle 6: Next.js and React Stack

**Rule:** Always use Next.js and React as the core framework. This is the established project setup and must not be changed. All new features and components must be built using Next.js App Router patterns and React components.

**Rationale:** Consistency in the technology stack eliminates decision fatigue and reduces context switching. The project is already configured with Next.js and React, and changing this would require significant refactoring with no benefit to iteration speed.

### Principle 7: shadcn/ui for UI Components

**Rule:** Use shadcn/ui for all UI components. Prefer existing shadcn components over custom implementations. Add new shadcn components as needed rather than building from scratch.

**Rationale:** shadcn/ui provides high-quality, customizable components that integrate seamlessly with the existing setup. Using it eliminates the need to build common UI patterns from scratch, dramatically accelerating development while maintaining design flexibility.

## Governance

### Amendment Procedure

This constitution may be amended at any time by updating this file. Changes should reflect evolving project needs while maintaining the core focus on iteration speed.

### Versioning

Version numbers follow semantic versioning:
- **MAJOR:** Backward-incompatible principle changes or removals
- **MINOR:** New principles added or existing principles materially expanded
- **PATCH:** Clarifications, wording improvements, or non-semantic refinements

### Compliance

This constitution serves as guidance, not strict enforcement. Principles may be violated when pragmatically necessary, but violations should be acknowledged and the constitution updated if the exception becomes the rule.
