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

- Group cards open the focused workspace for each verification group.
- Document tabs switch the selected required document item and update comments, file history, preview availability, and decision actions.
- Uploaded-file tabs switch the selected file for document items with multiple files.
- Document decision actions show only valid reviewer transitions for the selected document state.
- Reopen requires a reviewer comment before the state changes and shows simulated candidate-notification feedback.
- Field values can be edited independently from field confirmation checkboxes.
- Group and application progress update from the current document states and field confirmation states.
- Blockers remain visible by category for unverified documents, unchecked fields, and pending reopen comments.

## Implementation stance

The existing Vite + React + TypeScript mockup should remain frontend-only. Phase 3 should move the static arrays in `src/App.tsx` into local state or typed fixtures, add reducer-style update functions for document and field actions, and keep styling close to the current Lightning-inspired Phase 2 visual treatment.
