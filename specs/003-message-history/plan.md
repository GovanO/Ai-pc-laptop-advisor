# Implementation Plan: Message History Storage

**Branch**: `003-message-history` | **Date**: 2026-07-03 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from [spec.md](spec.md)

## Summary

Add server-side message persistence using json-server to store and retrieve the last 30 message pairs (user prompt + AI response) without requiring user authentication. The chat UI will send both the user prompt and AI response to a simple storage endpoint, and retrieve stored messages when the session loads.

## Technical Context

**Language/Version**: TypeScript with Next.js 16 and React 19

**Primary Dependencies**: Next.js, json-server, React

**Storage**: json-server with a local JSON file (`db.json`) for message persistence

**Quality/Validation**: Manual verification through the chat UI and acceptance criteria from the feature spec

**Target Platform**: Web application in a Next.js runtime with a json-server instance

**Project Type**: Web application with integrated local storage

**Performance Goals**: Simple request/response flow with minimal latency for message storage

**Constraints**: Keep the implementation simple and legible, use json-server for easy setup, no external database required

**Scale/Scope**: Single-page chat experience with up to 30 stored message pairs and a rolling window pruning strategy

## Constitution Check

This plan passes the constitution because it stays within the existing Next.js-first architecture, uses a local file-based store without introducing backend complexity, and keeps the UI and storage logic separate and maintainable.

## Project Structure

### Documentation (this feature)

```text
specs/003-message-history/
├── plan.md
├── spec.md
├── tasks.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── api/
│   │   ├── chat/route.ts
│   │   └── messages/route.ts
│   └── page.tsx
├── components/
│   └── ChatLayout.tsx
└── lib/
    ├── dial.ts
    └── messages.ts
```

### Server Storage (json-server)

```text
db.json                 # Local JSON file with message pairs
server.js              # json-server configuration (minimal)
package.json           # Updated with json-server dependency
```

**Structure Decision**: Keep the Next.js API routes lean by delegating storage to a json-server instance. The app logic handles the rolling 30-message window in a simple helper, and the UI wires message sending and retrieval to the new endpoints.

## Implementation Approach

1. **Add json-server dependency** to `package.json`
2. **Create `db.json`** with an empty messages collection
3. **Create `server.js`** as a minimal json-server configuration file
4. **Create `src/lib/messages.ts`** helper to:
   - Accept a new message pair
   - Enforce the 30-message rolling window
   - Return stored messages in chronological order
5. **Create `src/app/api/messages/route.ts`** to:
   - Accept POST requests with user prompt and AI response
   - Delegate storage to the `messages.ts` helper
   - Return success or error response
6. **Update the chat component** to:
   - Send both user prompt and AI response to the messages endpoint
   - Retrieve and display stored messages on load (optional for MVP)
7. **Add npm scripts** to run json-server alongside the dev server

## Complexity Tracking

No constitutional violations. The json-server keeps storage simple and legible without adding unnecessary backend infrastructure.

├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, delivery paths]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
