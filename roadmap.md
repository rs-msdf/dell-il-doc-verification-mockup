# Roadmap: Dell IL Tech Leaders Document Verification UI Mockup

This roadmap translates the mission and draft requirements into a phased UI mockup approach. The work should move from workflow clarity to a fully interactive reviewer experience, while keeping Salesforce Lightning Web Components (LWC) constraints in mind for future production implementation.

Technology decisions are tracked separately in `technology-decisions.md`.

## Stage 1: Workflow Foundation and Information Architecture

### Goal
Define the reviewer-facing structure for processing 10-20 applicant documents with minimal context switching between document validity checks and application consistency checks.

### Key activities
- Map the reviewer journey from application selection through final group completion.
- Define the main workspace layout, including group navigation, document review area, application field review area, and progress/status visibility.
- Plan the desktop workspace with document preview and field review side by side.
- Represent the five required verification groups:
  - Applicant ID.
  - Parent 1 ID.
  - Parent 2 ID.
  - Applicant Income.
  - Applicant Disability Status.
- Identify where applicant comments, document previews, document state controls, editable field values, and verified checkboxes appear.
- Define how reviewers scroll through and select among multiple uploaded files for a single required document type.
- Clarify how incomplete groups expose blockers, including unverified documents and unchecked fields.
- Group blockers by category, including unverified documents, unchecked fields, and required reopen comments when relevant.

### Deliverables
- Low-to-medium fidelity screen structure.
- Reviewer journey map.
- Group and document inventory mapped to fields.
- Initial completion logic model for groups.

### Exit criteria
- Reviewers can understand where to find each document, each related application field, and group-based completion status.
- The mockup structure supports grouped review without losing per-document state handling.

## Stage 2: Medium-Fidelity Static Mockup

### Goal
Create a static but realistic reviewer workspace that demonstrates the core verification experience and visual hierarchy.

### Key activities
- Build a medium-fidelity UI mockup using representative applicant data and sample document states.
- Show a clear group list with complete versus incomplete status at a glance.
- For the selected group, display:
  - Expected supporting documents.
  - Current document states.
  - Uploaded-file tabs when multiple files exist for one document type.
  - Applicant comments per document.
  - Document preview for the selected uploaded file when a file exists.
  - No preview for `Doesn't exist` documents.
  - Current application field values.
  - Editable field inputs.
  - Separate verified checkboxes per field.
- Surface missing completion items directly in the selected group view.
- Use visual patterns compatible with a future Salesforce Lightning/LWC implementation.

### Deliverables
- Static mockup of the main verification workspace.
- Representative examples of complete, incomplete, reopened, uploaded, verified, not uploaded, and doesn't-exist states.
- Visual treatment for progress, blockers, comments, and decision states.
- Current Phase 2 status: completed as a Vite + React + TypeScript static UI with supporting documentation.

### Exit criteria
- A reviewer can visually distinguish document review tasks from field consistency tasks.
- The mockup makes unverified documents and unchecked fields obvious without requiring hidden instructions.

## Stage 3: Clickable Workflow Prototype

### Goal
Turn the static mockup into a clickable prototype that validates navigation, review sequencing, and progressive completion across groups.

### Key activities
- Add group selection and document selection interactions.
- Allow reviewers to move between the five verification groups while preserving visible progress.
- Add prototype controls for document state transitions:
  - `Uploaded` to `Verified`.
  - `Verified` to `Uploaded`, `Not uploaded`, or `Doesn't exist` through Unverify when a reviewer needs to undo a mistaken verification.
  - `Uploaded` to `Reopened` with required comment.
  - `Verified` to `Reopened` with required comment.
  - `Reopened` to `Verified` after reviewer accepts the corrected or existing evidence.
  - `Doesn't exist` to `Verified` with required acceptance comment.
  - `Doesn't exist` to `Reopened` with required comment.
- Expose the latest sent correction comment for reopened documents.
- Prevent invalid or unsupported state transitions from appearing as available actions.
- Add editable application fields while keeping field verification as a separate checkbox action.
- Update group completion indicators when all documents are verified and all fields are checked.

### Deliverables
- Clickable prototype with realistic navigation and stateful UI behavior.
- Simulated applicant data across all groups.
- Prototype validation notes for confusing states, unclear actions, or missing blockers.
- Phase 3 status: complete. The clickable two-page prototype is implemented, validated, and documented in `phase-3-clickable-workflow-prototype/`.

### Exit criteria
- Reviewers can complete a group progressively by verifying documents and checking fields.
- Reopen flows visibly require comments before completion.
- Group completion responds correctly to document and field changes.

## Stage 4: UX Hardening and LWC Readiness

### Goal
Use the completed Phase 3 prototype as the review artifact for stakeholder feedback, then harden the experience for larger applications, accessibility, wording clarity, and future Salesforce LWC implementation planning.

### Key activities
- Review the Phase 3 prototype with stakeholders and record confusing states, unclear wording, or missing reviewer accountability cues.
- Refine density and scanning behavior for larger 10-20 document applications without losing required decisions.
- Review accessibility, keyboard navigation, responsive behavior, and focus states for the current two-page workflow.
- Tighten the Lightning-compatible visual language where the prototype diverges from likely Salesforce patterns.
- Map the current prototype into likely LWC component boundaries, including group cards, document tabs, file tabs, preview panels, decision controls, comment panels, field rows, and progress indicators.
- Review wording for fairness, clarity, and reviewer accountability.
- Identify production-only questions that should not be solved inside the mockup, such as persistence, notification infrastructure, audit history, permissions, and integration with uploaded file storage.

### Deliverables
- Detailed Phase 4 planning documentation in `phase-4-ux-hardening-lwc-readiness/`.
- Stakeholder UX review notes using the completed Phase 3 prototype.
- Density, accessibility, and responsive review checklist.
- Refined component inventory aligned with likely LWC implementation boundaries.
- Production-readiness question list for items outside the frontend mockup.

### Exit criteria
- The experience supports fast scanning without hiding required decisions.
- Reviewers can explain why each group is complete, incomplete, or waiting for applicant action.
- The interface remains feasible to translate into Salesforce LWC components later.
- Remaining work is clearly separated into prototype refinements versus production implementation planning.

## Stage 5: Retired as a Separate Mockup Phase

### Goal
Do not run a separate functional-mockup phase unless new stakeholder feedback introduces requirements outside the current Phase 3 prototype.

### Rationale
The original Stage 5 scope has already been absorbed into the completed Phase 3 implementation. The current prototype is runnable locally and includes stateful data, all required document states, allowed reviewer transitions, required reopen and missing-document acceptance comments, simulated notification feedback, preview and no-preview behavior, multiple uploaded-file selection, editable fields, independent field confirmation, derived group completion, overall progress, and selected-group blockers.

### Retired deliverables now covered by Phase 3
- Fully interactive UI mockup runnable locally.
- Stateful sample application data across all five verification groups and major edge cases.
- Functional group progress and blocker calculations.
- Functional reopen comment validation and simulated notification feedback.
- Notes documenting remaining production or stakeholder questions outside the mockup.

### Reopen criteria
Only reopen Stage 5 if Stage 4 review identifies a new class of functional behavior that cannot be represented through the existing Phase 3 prototype and is still needed before production design or LWC implementation planning.