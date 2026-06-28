# Phase 3 Interaction Model

## 1. Primary reviewer loop

The clickable prototype should support this loop without requiring page reloads or external services:

1. Reviewer scans group cards and chooses a group.
2. Reviewer selects a document item in the group.
3. Reviewer reviews applicant comment, uploaded-file history, and preview availability.
4. Reviewer verifies or reopens the document when an action is allowed.
5. Reviewer edits application fields when evidence and submitted values differ.
6. Reviewer checks field confirmation boxes after comparing evidence.
7. Reviewer sees group blockers and overall progress update.
8. Reviewer moves to another group and continues.

## 2. Group selection flow

### Entry state

- The page opens with all five group cards visible.
- The focused workspace opens to Applicant ID by default, matching Phase 2.
- Current progress is derived from fixture state, not hardcoded display strings.

### Interaction

- Clicking any group card sets `selectedGroupId`.
- The focused workspace scroll position should remain stable enough that the reviewer understands the workspace changed.
- The selected group card receives selected styling and an `aria-current` or equivalent accessible state.

### Workspace update

Changing groups updates:

- Breadcrumb group name.
- Group status pill.
- Missing-work chips.
- Document tabs.
- Selected document.
- File tabs and preview area.
- Applicant comment.
- Field rows.
- Available document actions.

### Default selected document rule

When a group opens, select the first document that needs reviewer attention. If all documents are verified, select the first document in the group.

Attention order:

1. `Uploaded`.
2. `Doesn't exist`.
3. `Not uploaded`.
4. `Reopened`.
5. `Verified`.

## 3. Document selection flow

### Interaction

- Clicking a document tab sets `selectedDocumentId` within the selected group.
- The document tab list keeps the document name and verification indicator visible.
- The selected tab controls all document detail content.

### Detail updates

Changing the selected document updates:

- State badge.
- Applicant comment.
- Reviewer reopen comment history, if any.
- Uploaded-file tabs.
- Selected file preview.
- No-preview message when there is no preview.
- Decision action controls.

### Empty and comment-only states

- `Not uploaded`: show that no file exists yet and no reviewer action is currently available.
- `Doesn't exist`: show applicant comment as the evidence context, no preview, and available reviewer actions `Verify` and `Reopen`.
- `Reopened`: show a clear action-area control for viewing the latest sent correction comment, preserve simulated notification status, and allow verification when the reviewer accepts the evidence.

## 4. Uploaded-file selection flow

### Interaction

- Clicking a file tab sets `selectedFileId` for the current document item.
- File tabs should preserve timestamp-only labels in the main row.
- The preview header can expose the filename in secondary text if needed for reviewer confidence.

### Default selected file rule

- Select the latest uploaded file by default.
- Preserve the reviewer's selected file while they remain on the same document.
- If a document changes to `Reopened`, keep the latest existing file visible as historical context.

## 5. Document decision flow

### Verify

When the reviewer clicks `Verify`:

- If the selected document state is `Uploaded` or `Reopened`, set state to `Verified`.
- If the selected document state is `Doesn't exist`, reveal a required acceptance comment input directly under the document decision buttons before setting state to `Verified`.
- On submitting a valid `Doesn't exist` acceptance comment, store the comment with timestamp-like mock metadata and set state to `Verified`.
- Clear any active reopen-comment draft for that document.
- Recalculate group completion and blockers.
- Keep the selected document open so the reviewer can see the result.

### Mark as uploaded

When the reviewer clicks `Mark as uploaded`:

- If the selected document state is `Verified`, set state back to `Uploaded`.
- Preserve uploaded-file history and the selected uploaded file.
- Clear any active reopen-comment draft for that document.
- Recalculate group completion and blockers so an accidental verification can be corrected immediately.

### Reopen

When the reviewer clicks `Reopen`:

- Reveal a reopen comment input directly under the document decision buttons so the required field is visibly tied to the `Reopen` action.
- Require a non-empty comment before enabling `Send correction request`.
- On submit, set state to `Reopened`.
- Store the reviewer comment with timestamp-like mock metadata.
- Show simulated notification feedback, such as `Correction request queued for candidate`.
- Recalculate group completion and blockers.

### Cancel reopen

- `Cancel` hides the comment input and preserves the prior document state.
- Canceling clears the draft comment for the current reopen attempt only.

## 6. Field review flow

### Edit field value

- Field values are editable text inputs or select controls, depending on the field type.
- Editing sets `editedInSession` to true.
- Editing does not change `checked`.
- Existing checked fields can remain checked after editing only if the reviewer intentionally leaves them checked; the prototype should make that choice visible enough for validation.

### Confirm field

- Checking a field marks it confirmed.
- Unchecking a field marks it incomplete and updates blockers.
- Label text should continue to read `Confirmed` when checked and `Confirm` when unchecked.

## 7. Blocker visibility flow

The selected-group status row should always show current blockers after each interaction.

Required chips:

- Unverified document count.
- Unchecked field count.
- Pending reopen comment validation, only while a reopen attempt is active and the comment is empty.
- Total blocker count.

When a group reaches completion, replace attention chips with a compact complete state such as `All documents verified` and `All fields confirmed`.

## 8. Accessibility and keyboard behavior

The prototype is desktop-only, but core controls should remain keyboard operable:

- Group cards are buttons or contain a clear button target.
- Document and file tabs use tab semantics or accessible button groups.
- Reopen comment input receives focus when revealed.
- Disabled or unavailable actions are not exposed as active controls.
- Status changes use visible text, not color alone.
