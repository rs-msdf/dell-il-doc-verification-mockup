# Stage 3 Build Checklist

## 1. State foundation

- [ ] Move group, document, uploaded-file, and field sample data into typed fixture objects.
- [ ] Add stable IDs for groups, document items, uploaded files, fields, reviewer comments, and notifications.
- [ ] Add selected group state.
- [ ] Add selected document state per group.
- [ ] Add selected uploaded-file state per document.
- [ ] Add active reopen draft state.
- [ ] Add local notification state for simulated candidate email feedback.

## 2. Derived calculations

- [ ] Derive document completion counts from current document states.
- [ ] Derive field completion counts from current field checks.
- [ ] Derive group complete versus incomplete status.
- [ ] Derive overall progress count.
- [ ] Derive selected-group blockers by category.
- [ ] Derive selected-document available actions from allowed transitions.

## 3. Group and document navigation

- [ ] Make group cards clickable.
- [ ] Update selected group styling and focused workspace content after group selection.
- [ ] Choose a useful default selected document when a group opens.
- [ ] Make document tabs clickable.
- [ ] Update state badge, applicant comment, file tabs, preview area, and action controls after document selection.
- [ ] Make uploaded-file tabs clickable for documents with multiple files.
- [ ] Preserve selected file per document during navigation.

## 4. Document actions

- [ ] Implement Verify for `Uploaded` documents.
- [ ] Implement Verify for `Doesn't exist` documents.
- [ ] Implement Reopen from `Uploaded` documents.
- [ ] Implement Reopen from `Verified` documents.
- [ ] Implement Reopen from `Doesn't exist` documents.
- [ ] Hide or disable unsupported actions for `Not uploaded` documents.
- [ ] Hide or disable unsupported actions for `Reopened` documents.
- [ ] Show no-preview states for documents without uploaded files.
- [ ] Keep prior file context visible for reopened documents with existing files.

## 5. Reopen comment flow

- [ ] Reveal comment input after Reopen is selected.
- [ ] Focus the comment input when it appears.
- [ ] Disable correction-request submission until comment is non-empty.
- [ ] Show inline validation for an empty touched comment.
- [ ] Store submitted reviewer comment on the document item.
- [ ] Add simulated candidate-notification feedback after submission.
- [ ] Allow canceling a reopen draft without changing document state.

## 6. Field review

- [ ] Convert field display values into editable controls.
- [ ] Track edited field values in state.
- [ ] Preserve field confirmation as a separate checkbox action.
- [ ] Show edited-in-session treatment after a field changes.
- [ ] Update blockers after checking or unchecking fields.
- [ ] Confirm that editing alone does not complete a field.

## 7. Validation and review

- [ ] Run the validation scenarios in `prototype-validation-plan.md`.
- [ ] Record confusing states and action wording issues.
- [ ] Confirm that all required document transitions from `requirements.md` are covered.
- [ ] Confirm that unsupported transitions are not exposed.
- [ ] Run `npm run build` after implementation changes.
- [ ] Capture updated desktop screenshot after implementation changes.

## 8. Documentation updates after build

- [ ] Update this checklist with completed implementation status.
- [ ] Update `README.md` in this folder with Phase 3 outcome notes.
- [ ] Add any open questions discovered during review to `prototype-validation-plan.md` or a follow-up decision log.
- [ ] Update the root `README.md` to describe the current prototype state.
