# Tasks: Message History Storage

**Input**: Design documents from [spec.md](spec.md)

**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Validation**: Use user-facing acceptance criteria and manual verification steps.

**Organization**: Tasks are grouped by user story to enable independent implementation and verification.

## Format: `[ID] [P?] [Story] Description`

## Phase 1: Setup (Shared Infrastructure)

- [X] T001 Add json-server as a dependency to package.json
- [X] T002 Create a minimal `db.json` file with an empty messages collection

---

## Phase 2: Foundational (Blocking Prerequisites)

- [X] T003 Create `src/lib/messages.ts` helper to manage the 30-message rolling window
- [X] T004 Create `src/app/api/messages/route.ts` POST endpoint that accepts and stores message pairs

---

## Phase 3: User Story 1 - Store user and AI messages on the server (Priority: P1) 🎯 MVP

**Goal**: Automatically persist both the user prompt and AI response when they are exchanged in the chat.

**Independent Verification**: Submit a message through the chat, verify it appears in `db.json` along with the AI response.

### Implementation for User Story 1

- [X] T005 [P] [US1] Update src/app/api/chat/route.ts to also call the messages storage endpoint after sending a response
- [X] T006 [US1] Ensure error handling so chat remains usable even if message storage fails

---

## Phase 4: User Story 2 - Retrieve and display stored messages (Priority: P2)

**Goal**: Enable the chat to fetch previously stored messages from the server.

**Independent Verification**: Close and reopen the chat, verify stored messages are retrieved and displayed.

### Implementation for User Story 2

- [X] T007 [P] [US2] Create a GET endpoint in `src/app/api/messages/route.ts` to retrieve stored messages
- [X] T008 [US2] Update `src/components/ChatLayout.tsx` to fetch and display stored messages on component mount

---

## Phase 5: User Story 3 - Maintain a rolling window of last 30 messages (Priority: P3)

**Goal**: Ensure only the most recent 30 message pairs are stored; older ones are automatically removed.

**Independent Verification**: Store more than 30 message pairs and verify only the last 30 remain.

### Implementation for User Story 3

- [X] T009 [P] [US3] Implement the rolling window pruning logic in `src/lib/messages.ts`
- [X] T010 [US3] Verify pruning works by adding messages and checking db.json

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T011 Add a simple `server.js` file to configure json-server with minimal settings
- [X] T012 Add npm scripts to run json-server (e.g., `npm run db` or separate terminal)
- [X] T013 Verify the app still builds and runs correctly with message storage integrated
- [X] T014 Test error handling when message storage fails (e.g., json-server down)
