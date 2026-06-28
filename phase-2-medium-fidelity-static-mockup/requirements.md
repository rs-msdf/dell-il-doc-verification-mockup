# Phase 2 Requirements: Medium-Fidelity Static Mockup

## 1. Purpose

Phase 2 creates the plan for a static but realistic reviewer workspace. The goal is to demonstrate the core verification experience and visual hierarchy before adding clickable state changes in Phase 3.

This phase should answer what the main workspace screen looks like, what representative content appears in it, how document review differs from field consistency review, and how incomplete work is made obvious.

## 2. Phase 1 readiness

Phase 1 is considered complete for Phase 2 entry because the following artifacts exist:

- Reviewer journey map.
- Desktop workspace information architecture.
- Required verification group inventory.
- Initial completion logic model.
- Blocker visibility model.
- Decision log and open questions.

Phase 2 should not re-decide the basic workflow foundation unless a static mockup review exposes a clear issue.

## 3. In scope

- One medium-fidelity static mockup of the main reviewer workspace.
- Build the actual static UI mockup for Phase 2.
- Representative applicant data and document states across all five groups.
- Static display of group progress by completion count.
- Static display of complete and incomplete group statuses.
- Selected group view with expected supporting documents, document states, applicant comments, uploaded-file list, preview area, field values, editable inputs, verified checkboxes, and missing completion items.
- Supporting static panels for required states that are not visible in the main Applicant ID screen.
- Static visual treatment for progress, blockers, comments, and decision states.
- Salesforce Lightning Design System-inspired layout, spacing, typography, badges, buttons, forms, and panels.
- Desktop-only layout.

## 4. Out of scope

- Clickable group selection or document selection.
- Interactive document state transitions.
- Functional field editing.
- Functional checkbox state changes.
- Reopen comment validation.
- Candidate email notification simulation.
- Backend, OCR, ML, or Salesforce data model implementation.
- Mobile or responsive mobile layouts.

## 5. Required static screen content

The main static screen must include:

- Application header with applicant identity, application reference, and group progress such as `2 of 5 groups complete`.
- Persistent group navigation with all five required groups.
- Complete versus incomplete status for each group.
- Selected group summary with expected documents, related fields, current state, and missing completion items.
- Document review area showing expected document items for the selected group.
- Current document state for each selected-group document item.
- Applicant comments visible for each selected-group document item.
- Scrollable/selectable uploaded-file list for a selected document item with multiple files.
- Selected uploaded file marker.
- Document preview region for the selected uploaded file.
- No-preview treatment for `Doesn't exist` documents in at least one representative state.
- Application field review area with submitted values, editable controls, and separate verified checkboxes.
- Blocker or missing-items area grouped by unverified documents, unchecked fields, and reopen comments when relevant.

Supporting static panels must show representative states that are not visible in the selected Applicant ID screen, especially `Reopened`, `Doesn't exist`, and simple complete-group states.

## 6. Required representative states

The static mockup plan must include examples of:

- Complete group.
- Incomplete group.
- `Verified` document.
- `Uploaded` document needing reviewer decision.
- `Reopened` document awaiting candidate correction or replacement.
- `Not uploaded` document.
- `Doesn't exist` document with no preview and applicant-comment context.
- Document item with multiple uploaded files.
- Uploaded-file entries with explicit labels such as `Initial upload` and `Applicant replacement`.
- Checked field.
- Unchecked field.
- Edited field value that is still separately verified or unverified.

## 7. Confirmed design decisions

- The Phase 2 deliverable is an actual static UI build, not documentation only.
- The main screen should use Applicant ID as the selected group.
- The UI should include supporting static panels for states that live outside the selected Applicant ID group.
- Uploaded file entries should use explicit upload reason labels.
- The styling should be loosely Salesforce Lightning-inspired while remaining a custom mockup.
- The fictional Dana Levi sample applicant data should remain the default sample content.

## 8. Exit criteria

Phase 2 planning is complete when:

- The static main workspace screen is specified in enough detail to build without re-deciding layout.
- Representative data covers all five groups and the major document states.
- The selected group view clearly defines document review, preview, field review, and blockers.
- The visual treatment is compatible with future Lightning/LWC implementation.
- The mockup review checklist can be used to evaluate whether a reviewer can distinguish document review tasks from field consistency tasks.
- The mockup review checklist can verify that unverified documents and unchecked fields are obvious without hidden instructions.
