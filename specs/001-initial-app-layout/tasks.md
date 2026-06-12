# Tasks: App Layout

**Input**: User stories and requirements from `specs/001-app-layout/spec.md`

**Prerequisites**: `spec.md` (available)

**Validation**: Use the user stories and success criteria in `specs/001-app-layout/spec.md` to verify each task.

**Organization**: Tasks are grouped by phase and user story so each story can be implemented and verified independently.

## Phase 1: Setup

**Purpose**: Capture the feature scope and prepare the target app files.

- [ ] T001 Create `specs/001-app-layout/plan.md` summarizing the implementation approach for the app layout feature
- [ ] T002 [P] Create `src/components/ChatLayout.tsx` as a client component for the chat-style interface
- [ ] T003 [P] Update `src/app/globals.css` to define the dark Asus ROG-inspired theme variables and base styles
- [ ] T004 Update `src/app/page.tsx` to render `ChatLayout` from `src/components/ChatLayout.tsx`
- [ ] T005 Review `src/app/layout.tsx` metadata and root body wrapper to ensure the page renders full-screen content correctly

---

## Phase 2: Foundational

**Purpose**: Implement the shared layout and input behavior that all user stories depend on.

- [ ] T006 [US1] Implement the chat layout container and header in `src/components/ChatLayout.tsx`
- [ ] T007 [US1] Add the main message panel and welcome instructions in `src/components/ChatLayout.tsx`
- [ ] T008 [US1] Add the persistent text input area in `src/components/ChatLayout.tsx`

---

## Phase 3: User Story 1 - Launch chat-style layout (Priority: P1)

**Goal**: Deliver a clean chat-inspired interface with a dark gaming aesthetic and no login/signup UI.

**Independent Verification**: Load the page and confirm a header, a main content area, and a text input area are visible, with no login or sign-up elements.

- [ ] T009 [US1] Confirm `src/components/ChatLayout.tsx` renders a chat-style interface with a header, message area, and input region
- [ ] T010 [US1] Confirm `src/app/page.tsx` renders only `ChatLayout` and does not include login/signup controls

---

## Phase 4: User Story 2 - Submit text input with Enter (Priority: P2)

**Goal**: Enable text-only input submission by pressing Enter.

**Independent Verification**: Type text, press Enter, and confirm the placeholder handler is invoked with the entered value.

- [ ] T011 [US2] Add controlled input state to `src/components/ChatLayout.tsx`
- [ ] T012 [US2] Add `handleKeyDown` in `src/components/ChatLayout.tsx` to submit on Enter and allow Shift+Enter for new lines
- [ ] T013 [US2] Add `prepareChatInput` placeholder function in `src/components/ChatLayout.tsx` and invoke it on valid Enter submission
- [ ] T014 [US2] Prevent submission when the input is empty in `src/components/ChatLayout.tsx`

---

## Phase 5: User Story 3 - Gaming-inspired theme with balanced colors (Priority: P3)

**Goal**: Apply a refined dark Asus ROG-style palette with limited accent colors and avoid overly bright visuals.

**Independent Verification**: Review the rendered interface and confirm it uses a dark base palette with muted gaming accents, no more than three primary accent colors.

- [ ] T015 [US3] Apply dark theme variables in `src/app/globals.css`
- [ ] T016 [US3] Tune `src/components/ChatLayout.tsx` styling so the interface uses no more than three primary accent colors
- [ ] T017 [US3] Verify the layout remains readable and uncluttered on a standard desktop/laptop viewport

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Review the layout and ensure the user experience is consistent across the page.

- [ ] T018 [P] Review the page for desktop/laptop layout readability and fix any overflow or spacing issues in `src/components/ChatLayout.tsx`
- [ ] T019 [P] Update any page metadata or documentation if needed in `src/app/layout.tsx` or README

---

## Dependencies & Execution Order

- Phase 1 must complete first to ensure files and theme variables are prepared.
- Phase 2 foundational work must complete before user story-specific behaviour is verified.
- User stories can be implemented and verified independently once foundational layout and input handling are in place.
- Final polish tasks can run once the core interface and submit behavior are complete.

## Parallel Execution Opportunities

- `T002` and `T003` can run in parallel because they update independent files.
- `T011`, `T012`, `T013`, and `T014` can be developed in parallel within the input behavior story once `ChatLayout.tsx` exists.
- `T015` and `T016` can be done in parallel to separate theme styling from component markup.

## Implementation Strategy

1. Start with Setup tasks to capture the plan and prepare the component and page wiring.
2. Complete Foundational layout structure and input area.
3. Deliver User Story 1 first and verify the chat-style page renders correctly.
4. Add User Story 2 behavior for Enter submission and placeholder processing.
5. Add User Story 3 theme polish and verify the visual style.
6. Finish with cross-cutting review for desktop presentation and any metadata updates.
