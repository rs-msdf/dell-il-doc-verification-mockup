# Phase 2: Medium-Fidelity Static Mockup

This folder contains the detailed Phase 2 plan for creating a static but realistic reviewer workspace for the Dell IL Tech Leaders document verification UI mockup.

Phase 1 is complete enough to proceed because it documents the reviewer journey, desktop workspace structure, verification groups, completion rules, blocker categories, and Stage 2 handoff notes. Phase 2 uses those foundations to plan the static screen, representative data, visual hierarchy, and review checklist before clickable behavior is added in Phase 3.

## Source inputs

- `../mission.md`
- `../requirements.md`
- `../roadmap.md`, Stage 2
- `../technology-decisions.md`
- `../phase-1-workflow-foundation/README.md`
- `../phase-1-workflow-foundation/workspace-information-architecture.md`
- `../phase-1-workflow-foundation/verification-group-inventory.md`
- `../phase-1-workflow-foundation/completion-logic-model.md`
- `../phase-1-workflow-foundation/blocker-visibility-model.md`
- `../phase-1-workflow-foundation/decision-log-and-open-questions.md`

## Deliverables in this folder

- `requirements.md`: Phase 2 scope, requirements, deliverables, and exit criteria.
- `static-mockup-plan.md`: Main static screen plan, layout hierarchy, selected group details, and content placement.
- `representative-sample-data.md`: Applicant, group, document, uploaded-file, comment, field, and blocker sample data for the static mockup.
- `visual-treatment-guidelines.md`: Medium-fidelity visual direction compatible with future Salesforce Lightning/LWC implementation.
- `screen-state-matrix.md`: Static examples needed to represent complete, incomplete, reopened, uploaded, verified, not uploaded, and `Doesn't exist` states.
- `stage-2-build-checklist.md`: Practical checklist for building and reviewing the Stage 2 static mockup.

## Phase 2 outcome

Phase 2 should result in one medium-fidelity static reviewer workspace screen that makes the core verification experience legible:

- Group navigation shows complete versus incomplete status.
- The selected group shows expected supporting documents, current document states, applicant comments, uploaded-file list, selected-file preview, application fields, editable inputs, verified checkboxes, and blockers.
- Representative states are visible somewhere in the screen or supporting static examples.
- The visual hierarchy clearly separates document validity review from field consistency review while keeping both in one coordinated workspace.
