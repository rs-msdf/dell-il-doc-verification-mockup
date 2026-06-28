# Phase 3: Clickable Workflow Prototype

This folder contains the Phase 3 plan for turning the completed medium-fidelity static reviewer workspace into a clickable, stateful prototype.

Phase 3 should validate whether reviewers can move through the five verification groups, select documents and uploaded files, make allowed document decisions, edit and confirm application fields, and see group completion update progressively without hidden instructions.

## Source inputs

- `../mission.md`
- `../requirements.md`
- `../roadmap.md`, Stage 3
- `../technology-decisions.md`
- `../phase-1-workflow-foundation/README.md`
- `../phase-1-workflow-foundation/completion-logic-model.md`
- `../phase-1-workflow-foundation/blocker-visibility-model.md`
- `../phase-2-medium-fidelity-static-mockup/README.md`
- `../phase-2-medium-fidelity-static-mockup/requirements.md`
- `../phase-2-medium-fidelity-static-mockup/representative-sample-data.md`
- `../phase-2-medium-fidelity-static-mockup/screen-state-matrix.md`

## Deliverables in this folder

- `requirements.md`: Phase 3 scope, requirements, deliverables, and exit criteria.
- `interaction-model.md`: Clickable flows for group selection, document selection, file selection, document decisions, reopen comments, and field review.
- `state-and-completion-model.md`: Prototype state model, allowed transitions, validation rules, blockers, and derived completion calculations.
- `prototype-data-plan.md`: Stateful fixture plan for all five groups and the major document, file, field, and blocker scenarios.
- `prototype-validation-plan.md`: Review scripts and acceptance checks for validating navigation, sequencing, completion, and confusing states.
- `stage-3-build-checklist.md`: Practical implementation checklist for building and reviewing the clickable prototype.

## Phase 3 outcome target

Phase 3 is complete when the prototype supports realistic reviewer navigation and state changes:

- The summary page shows the five verification groups, and each group card opens a separate focused workspace page for that group.
- The focused workspace page includes a clear back button that returns to the summary page without losing current prototype state.
- Document tabs switch the selected required document item and update comments, file history, preview availability, and decision actions.
- Uploaded-file tabs switch the selected file for document items with multiple files.
- Document decision actions show only valid reviewer transitions for the selected document state.
- Verified documents can be marked back to `Uploaded` when a reviewer needs to undo an accidental verification.
- Reopened documents can be verified and expose the latest sent correction comment from the action area.
- `Doesn't exist` documents use the same status treatment as `Not uploaded` and require an explanatory acceptance comment before verification.
- Reopen requires a reviewer comment before the state changes and shows simulated candidate-notification feedback.
- Field values can be edited independently from field confirmation checkboxes.
- Group and application progress update from the current document states and field confirmation states.
- Blockers remain visible by category for unverified documents, unchecked fields, and pending reopen comments.

## Implementation outcome

Phase 3 has been implemented in the Vite + React + TypeScript mockup as a frontend-only stateful prototype.

- `src/App.tsx` now owns typed fixtures for all five verification groups, required document items, uploaded files, field rows, reviewer reopen comments, and local notification feedback.
- The UI is split into a group-summary page and a selected-group drilldown page with explicit back navigation.
- Group cards, document tabs, and uploaded-file tabs are clickable and preserve reviewer selections while navigating among groups.
- Document actions are derived from the selected document state: `Uploaded` documents can be verified or reopened, `Doesn't exist` documents can be reopened or verified with an acceptance comment, `Verified` documents can be reopened or marked back to `Uploaded`, `Reopened` documents can be verified and expose the sent correction comment, and `Not uploaded` documents wait for applicant action.
- Reopen requires a non-empty reviewer comment directly under the decision controls, stores the submitted comment, and shows simulated candidate-notification feedback.
- Field values are editable independently from field confirmation checkboxes, and edited fields receive an in-session marker.
- Group card completion counts, group-card missing-work details, selected-group blocker chips, and overall application progress are derived from current document and field state.
- Updated desktop screenshot artifacts are captured in `artifacts/` for summary, drilldown, inline reopen entry, and reopened sent-comment views.

## Implementation stance

The existing Vite + React + TypeScript mockup should remain frontend-only. Phase 3 should move the static arrays in `src/App.tsx` into local state or typed fixtures, add reducer-style update functions for document and field actions, and keep styling close to the current Lightning-inspired Phase 2 visual treatment.
