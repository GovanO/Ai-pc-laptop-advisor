# Tasks: Model Response Integration

**Input**: Design documents from [spec.md](spec.md)

**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Validation**: Use user-facing acceptance criteria and manual verification steps.

**Organization**: Tasks are grouped by user story to enable independent implementation and verification.

## Format: `[ID] [P?] [Story] Description`

## Phase 1: Setup (Shared Infrastructure)

- [x] T001 Configure dotenv loading so environment variables are available via `process.env`
- [x] T002 Add the DIAL SDK dependency to the project and keep the feature scoped to the existing chat structure

---

## Phase 2: Foundational (Blocking Prerequisites)

- [x] T003 Create a server-side DIAL helper in src/lib/dial.ts that initializes the SDK using the configured API key
- [x] T004 Create a Next.js API route at src/app/api/chat/route.ts that accepts a prompt from the client and returns a model response

---

## Phase 3: User Story 1 - Submit a prompt and receive a model response (Priority: P1) 🎯 MVP

**Goal**: Connect the existing chat input submission flow to the server-side model response path.

**Independent Verification**: A user can submit text and receive a model response from the app without exposing the API key in the client.

### Implementation for User Story 1

- [x] T005 [P] [US1] Update src/components/ChatLayout.tsx to send the entered prompt to the API route and display the server response
- [x] T006 [US1] Preserve the entered prompt and prepare it for later response handling with the connected model
- [x] T007 [US1] Add a clear user-facing fallback message when the API key is not configured or the request fails

---

## Phase 4: Polish & Cross-Cutting Concerns

- [x] T008 Review the updated chat flow for clarity and ensure the prompt is sent to the server and returned correctly
- [x] T009 Verify the app still renders correctly and the submit flow remains usable in the browser
