# Feature Specification: PC/Laptop-Only Response Scope

**Feature Branch**: `004-pc-laptop-only`

**Created**: 2026-07-06

**Status**: Draft

**Input**: narrow down model response to laptop and pc only - please make sure that ai model is answering to pc (perosnal computer) or laptop related questions only. No other topics whatsoever. Make sure of that for good

## Clarifications

- The assistant should use a prompt engineering strategy that constrains responses to personal computers and laptops only.
- If the user asks about any unsupported device category, the assistant should reply: "I'm sorry but I can only answer pc/laptop related questions."
- This restriction applies to recommendations, comparisons, and any general device advice.

## User Scenarios & Validation *(mandatory)*

### User Story 1 - Enforce PC and laptop response scope (Priority: P1)

When a user asks a hardware or device question, the assistant responds only with personal computer and laptop guidance.

**Why this priority**: This is the core behavior for the chat assistant, ensuring it stays within the intended domain and does not drift into phones, tablets, wearables, or IoT.

**Independent Verification**: Test queries that mention devices or use cases are handled with responses referencing only PCs or laptops.

**Acceptance Scenarios**:

1. **Given** a user asks about device recommendations, **When** the assistant responds, **Then** the reply refers only to PCs, desktops, workstations, notebooks, or laptops.
2. **Given** a user asks about phones, tablets, wearables, or IoT, **When** the assistant responds, **Then** it clearly states that only PC and laptop advice is supported.

---

### User Story 2 - Reject or redirect unsupported device categories (Priority: P2)

When a user requests information about unsupported device types, the assistant should clearly explain that only PCs and laptops are supported and suggest asking a PC/laptop-specific question.

**Why this priority**: This prevents the assistant from giving incorrect or off-topic advice and keeps user expectations aligned.

**Independent Verification**: Ask questions about tablets, mobile phones, or smart home devices and verify the responses are out-of-scope redirections rather than recommendations.

**Acceptance Scenarios**:

1. **Given** a user asks about tablets or smartphones, **When** the assistant replies, **Then** it explains that it only supports PC and laptop guidance.

---

### User Story 3 - Support relevant PC/laptop use cases with domain focus (Priority: P3)

The assistant can answer broader PC/laptop use cases such as gaming, productivity, content creation, or workstation setup, as long as the response remains within the personal computer and laptop domain.

**Why this priority**: This keeps the feature useful for real user scenarios while preserving strict topic boundaries.

**Independent Verification**: Ask for gaming or office hardware advice and verify the answer is framed around PCs or laptops only.

**Acceptance Scenarios**:

1. **Given** a user asks about gaming performance, **When** the assistant responds, **Then** it recommends only PC or laptop options.

---

### Edge Cases

- What happens when a user asks about a hybrid device like a 2-in-1 convertible laptop?
- How should the assistant handle a question that mentions both laptops and smartphones?
- What is the proper response if the user explicitly requests a tablet or wearable recommendation?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The AI model MUST answer only with PC or laptop information when handling hardware or device questions.
- **FR-002**: The AI model MUST not provide recommendations or comparisons for phones, tablets, wearables, or IoT devices.
- **FR-003**: If a user asks about an unsupported device category, the assistant MUST clearly state that only PC and laptop support is available.
- **FR-004**: The system MUST maintain usefulness for PC/laptop scenarios while enforcing the domain restriction.
- **FR-005**: The system MUST reject or redirect device requests that fall outside the PC/laptop domain.
- **FR-006**: The system MUST use prompt engineering to force the model to answer only PC or laptop queries and to reject unsupported device categories with the exact phrase: "I'm sorry but I can only answer pc/laptop related questions."

### Key Entities

- **Allowed Device Scope**: Personal computers and laptops, including desktops, notebooks, gaming laptops, workstation rigs, and ultrabooks.
- **Out-of-Scope Device Category**: Mobile phones, tablets, wearables, smartwatches, IoT devices, and other non-PC hardware.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of device-related test prompts are answered with PC or laptop guidance only.
- **SC-002**: 100% of questions mentioning unsupported devices receive a response that says the assistant only supports PCs and laptops.
- **SC-003**: The assistant does not include unsupported categories like mobile phones, tablets, wearables, or IoT in its recommendations.
- **SC-004**: The assistant remains helpful for PC/laptop questions and provides usable advice within the allowed device scope.

## Assumptions

- The model can be constrained by prompt engineering or a scope filter to remain within the PC/laptop domain.
- No mobile, tablet, wearable, or IoT device recommendations are allowed for this feature.
- The chat interface can still answer broad PC/laptop use cases without violating the scope restriction.
- Domain restrictions are enforced before or during model response generation.
