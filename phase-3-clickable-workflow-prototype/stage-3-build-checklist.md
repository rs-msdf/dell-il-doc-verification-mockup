# Stage 3 Build Checklist

## 1. State foundation

- [x] Move group, document, uploaded-file, and field sample data into typed fixture objects.
- [x] Add stable IDs for groups, document items, uploaded files, fields, reviewer comments, and notifications.
- [x] Add selected group state.
- [x] Add selected document state per group.
- [x] Add selected uploaded-file state per document.
- [x] Add active reopen draft state.
- [x] Add local notification state for simulated candidate email feedback.

## 2. Derived calculations

- [x] Derive document completion counts from current document states.
- [x] Derive field completion counts from current field checks.
- [x] Derive group complete versus incomplete status.
- [x] Derive overall progress count.
- [x] Derive selected-group blockers by category.
- [x] Derive selected-document available actions from allowed transitions.

## 3. Group and document navigation

- [x] Make group cards clickable.
- [x] Open a separate focused workspace page after group selection.
- [x] Add back navigation from the focused workspace to the group summary page.
- [x] Choose a useful default selected document when a group opens.
- [x] Make document tabs clickable.
- [x] Update state badge, applicant comment, file tabs, preview area, and action controls after document selection.
- [x] Make uploaded-file tabs clickable for documents with multiple files.
- [x] Preserve selected file per document during navigation.

## 4. Document actions

- [x] Implement Verify for `Uploaded` documents.
- [x] Implement Verify for `Doesn't exist` documents with required acceptance comment.
- [x] Implement Mark as uploaded from `Verified` documents.
- [x] Implement Reopen from `Uploaded` documents.
- [x] Implement Reopen from `Verified` documents.
- [x] Implement Reopen from `Doesn't exist` documents.
- [x] Implement Verify from `Reopened` documents.
- [x] Add a sent-comment viewing control for `Reopened` documents.
- [x] Match `Doesn't exist` status styling to `Not uploaded`.
- [x] Hide or disable unsupported actions for `Not uploaded` documents.
- [x] Show no-preview states for documents without uploaded files.
- [x] Keep prior file context visible for reopened documents with existing files.

## 5. Reopen comment flow

- [x] Reveal comment input after Reopen is selected.
- [x] Focus the comment input when it appears.
- [x] Disable correction-request submission until comment is non-empty.
- [x] Show inline validation for an empty touched comment.
- [x] Store submitted reviewer comment on the document item.
- [x] Add simulated candidate-notification feedback after submission.
- [x] Allow canceling a reopen draft without changing document state.

## 6. Field review

- [x] Convert field display values into editable controls.
- [x] Track edited field values in state.
- [x] Preserve field confirmation as a separate checkbox action.
- [x] Show edited-in-session treatment after a field changes.
- [x] Update blockers after checking or unchecking fields.
- [x] Confirm that editing alone does not complete a field.

## 7. Validation and review

- [x] Run the validation scenarios in `prototype-validation-plan.md`.
- [x] Record confusing states and action wording issues.
- [x] Confirm that all required document transitions from `requirements.md` are covered.
- [x] Confirm that unsupported transitions are not exposed.
- [x] Run `npm run build` after implementation changes.
- [x] Capture updated desktop screenshot after implementation changes.

## 8. Documentation updates after build

- [x] Update this checklist with completed implementation status.
- [x] Update `README.md` in this folder with Phase 3 outcome notes.
- [x] Add any open questions discovered during review to `prototype-validation-plan.md` or a follow-up decision log.
- [x] Update the root `README.md` to describe the current prototype state.
