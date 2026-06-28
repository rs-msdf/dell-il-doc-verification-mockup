# Phase 3 Requirements: Clickable Workflow Prototype

## 1. Purpose

Phase 3 turns the Phase 2 static mockup into a clickable prototype that validates review sequencing, stateful navigation, and progressive group completion.

The phase should answer whether reviewers understand what to do next, whether document and field actions update completion predictably, and whether blocked states are visible at the moment they matter.

## 2. Phase 2 readiness

Phase 2 is ready for Phase 3 because the project already has:

- A Vite + React + TypeScript static UI.
- A group overview with all five required verification groups.
- An opened Applicant ID workspace with document tabs, file tabs, document preview, applicant comment, document actions, and field verification rows.
- Representative sample data for all required groups, document states, uploaded files, fields, and blockers.
- Visual treatment compatible with a future Salesforce Lightning/LWC implementation.

Phase 3 should build from this existing shape rather than redesigning the workspace layout.

## 3. In scope

- Clickable group selection across all five verification groups.
- Clickable document selection within the selected group.
- Clickable uploaded-file selection for document items with uploaded files.
- Conditional document action controls based on the selected document state.
- Reviewer transitions:
  - `Uploaded` to `Verified`.
  - `Uploaded` to `Reopened` with required comment.
  - `Verified` to `Reopened` with required comment.
  - `Doesn't exist` to `Verified`.
  - `Doesn't exist` to `Reopened` with required comment.
- Hidden or disabled unsupported actions for states that do not allow reviewer transitions.
- Reopen comment entry and validation.
- Simulated candidate notification feedback after a successful reopen action.
- Editable application field values.
- Separate field confirmation checkboxes that remain independent from edits.
- Derived group completion from current document and field states.
- Derived application progress count, such as `3 of 5 groups complete`.
- Inline blocker visibility for unverified documents, unchecked fields, and pending reopen comment validation.
- Desktop-only clickable prototype.

## 4. Out of scope

- Backend persistence.
- Real candidate email delivery.
- Salesforce data model implementation.
- OCR, ML extraction, or automated document parsing.
- Authentication, reviewer assignment, audit logging, or production permission logic.
- Mobile or responsive mobile layout.
- High-fidelity visual redesign beyond what is needed to support the interactions.

## 5. Required interaction behavior

### Group selection

- Clicking a group card opens that group in the focused workspace.
- The selected group card is visually marked.
- The focused workspace title, document tabs, fields, blockers, and completion chips update to the selected group.
- The `All document groups` control returns focus to the group overview area without losing current prototype state.

### Document selection

- Clicking a document tab makes that required document item the selected document.
- The selected document controls the visible state badge, applicant comment, file tabs, preview area, and available document actions.
- Document items with no uploaded files show a no-preview state.
- `Doesn't exist` document items show comment-only review context and no preview.

### Uploaded-file selection

- Clicking an uploaded-file tab changes the selected preview file for the selected document item.
- File tabs remain timestamp-first in the main UI.
- Supporting file metadata can be used internally to preserve upload label and filename context.

### Document decisions

- `Verify` is available for `Uploaded` and `Doesn't exist` documents.
- `Reopen` is available for `Uploaded`, `Verified`, and `Doesn't exist` documents.
- `Reopen` opens or reveals a required comment input before the state can change.
- `Not uploaded` and `Reopened` documents do not expose reviewer decision actions because the reviewer is waiting for applicant action.
- Successful reopen changes the document state to `Reopened`, stores the reviewer comment, and shows simulated notification feedback.

### Field review

- Field value controls are editable.
- Editing a value does not automatically check the field confirmation box.
- A reviewer can check or uncheck each field confirmation box independently.
- A field row should show when a value has been edited during the prototype session.

### Completion and blockers

- A group is complete only when every group document is `Verified` and every group field is checked.
- Top-level progress updates whenever group completion changes.
- Selected-group blocker chips update immediately from current state.
- Blocker categories include unverified documents, unchecked fields, and pending reopen comment validation.

## 6. Exit criteria

Phase 3 is complete when:

- A reviewer can navigate among all five groups and return to previously changed groups without losing state.
- A reviewer can select each document and each uploaded file where files exist.
- Valid document actions appear for the selected state and unsupported actions do not appear as available actions.
- Reopen flows prevent completion until a comment is entered.
- Field edits and field confirmation checkboxes behave as separate actions.
- Group completion and overall progress respond correctly to document and field changes.
- Validation notes identify any confusing states, unclear action wording, or missing blocker visibility discovered during prototype review.
