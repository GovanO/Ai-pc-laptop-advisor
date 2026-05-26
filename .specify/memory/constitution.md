<!--
Sync Impact Report
Version change: placeholder -> 0.1.0
Modified principles: added User-first clarity; Next.js first; Tailwind-only styling; Clean code discipline; Review and delivery quality
Added sections: Technology Constraints; Development Workflow
Removed sections: none
Templates requiring updates: .specify/templates/spec-template.md ✅ updated, .specify/templates/tasks-template.md ✅ updated, .specify/templates/plan-template.md ✅ updated
Follow-up TODOs: none
-->

# AI PC/Laptop Advisor Constitution

## Core Principles

### I. User-first clarity
The application must present recommendations and configuration guidance in simple, friendly language. UX decisions are governed by clarity, minimal friction, and direct support for the user's hardware goals. Interfaces must avoid jargon unless the meaning is explained.

### II. Next.js first
The product architecture is centered on Next.js as the core technology. Client and server behavior should use Next.js conventions, routing, and rendering capabilities. External services are allowed only when a feature cannot be delivered within the Next.js runtime.

### III. Tailwind-only styling
All styling must be implemented with Tailwind CSS and its standard Next.js integration. Avoid separate CSS frameworks, custom build pipelines, or vendor-specific styling systems outside the Next.js + Tailwind stack.

### IV. Clean code discipline
Code must be easy to read, concise, and maintainable. Components, utilities, and pages should be small, clearly named, and limited to one responsibility. Complex solutions must be justified and kept as lean as possible.

### V. Review and delivery quality
Quality is achieved through review, manual verification, and user-facing acceptance criteria rather than through mandated automated testing. Every change must be reviewed for correctness, usability, and adherence to the constitution.

## Technology Constraints
The project must remain within these constraints:
- Use Next.js and React as the core web framework.
- Use Tailwind CSS exclusively for styling.
- Do not add new backend servers unless absolutely required by a feature.
- Do not upgrade package.json dependencies once the initial install and project decisions are made.
- Do not introduce any testing frameworks or automated test suites for this project.

## Development Workflow
Development work must follow a simple, review-driven workflow:
- Proposals and changes are documented in PRs and reviewed before merge.
- Acceptance is based on user-facing verification, UX clarity, and functional correctness.
- Complexity must be justified when code or architecture deviates from the simplest valid solution.
- Features should be delivered incrementally, with each increment complete and usable on its own.

## Governance
This constitution governs technology choices, UX expectations, and delivery discipline for the AI PC/Laptop Advisor project. All development and design decisions must comply with these principles unless an explicit amendment is approved.

Amendments:
- Patch version bumps are used for wording clarifications and editorial updates.
- Minor version bumps are used for added principles, sections, or substantive guidance expansions.
- Major version bumps are used for removed principles, redefined governance, or material policy changes.

Compliance:
- Every change must be reviewed against this constitution.
- PRs must state which principles they honor and why any deviation is necessary.
- The project owner or maintainer reviews significant architectural changes before approval.

**Version**: 0.1.0 | **Ratified**: 2026-05-25 | **Last Amended**: 2026-05-25

