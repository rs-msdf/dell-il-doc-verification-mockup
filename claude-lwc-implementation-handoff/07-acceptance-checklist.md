# Acceptance Checklist

Use this checklist to validate the LWC implementation before considering the handoff complete.

## 1. Summary page

- [ ] Header shows Dana Levi, application `APP-2026-0148`, and Dell IL Tech Leaders.
- [ ] Overall progress is derived from complete groups.
- [ ] Five group cards render.
- [ ] Each card shows complete/incomplete status.
- [ ] Each card shows document count and field count.
- [ ] Each incomplete card shows actionable missing-work text.
- [ ] Selecting a card opens the corresponding drilldown page.

## 2. Navigation

- [ ] Summary page is the entry state.
- [ ] Back button returns from drilldown to summary.
- [ ] State persists after returning to summary and reopening groups.
- [ ] Default selected document follows the attention order.

## 3. Document selection and file history

- [ ] Document tabs switch selected document.
- [ ] Selected document controls state badge, applicant comment, preview, file tabs, and actions.
- [ ] Uploaded-file tabs switch selected file.
- [ ] Selecting an older file updates preview metadata without changing document state.
- [ ] Documents with no files show a clear no-preview state.
- [ ] A selected file shows a compact `View full screen` or equivalent preview-inspection affordance; it may be disabled/no-op in the mock implementation.

## 4. Document actions

- [ ] `Uploaded` documents expose Verify and Reopen.
- [ ] `Uploaded -> Verify` sets state to `Verified` without requiring a comment.
- [ ] `Uploaded -> Reopen` requires a non-empty correction comment.
- [ ] `Verified` documents expose Unverify and Reopen.
- [ ] Unverify returns to `Uploaded` when files exist.
- [ ] Unverify returns to `Not uploaded` or `Doesn't exist` when no files exist, based on stored return state.
- [ ] `Reopened` documents expose Verify and View/Hide sent comment.
- [ ] `Reopened -> Verify` sets state to `Verified`.
- [ ] `Doesn't exist` documents expose Verify and Reopen.
- [ ] `Not uploaded` documents expose Verify but not Reopen.
- [ ] Unsupported transitions are not visible as active controls.
- [ ] Applicant/external transitions are handled from refreshed data, not exposed as reviewer buttons: `Not uploaded -> Uploaded`, `Not uploaded -> Doesn't exist`, and `Reopened -> Uploaded` after a replacement upload.
- [ ] `Reopened -> Uploaded` after applicant replacement preserves sent correction history and makes the document reviewable but incomplete.

## 5. Reopen comment flow

- [ ] Reopen reveals an inline correction comment panel.
- [ ] The textarea receives focus when revealed.
- [ ] Empty or whitespace-only comments are invalid.
- [ ] Invalid comment state appears near the textarea.
- [ ] Submit is disabled or blocked until the comment is valid.
- [ ] Valid submit changes state to `Reopened`.
- [ ] Valid submit stores the latest reviewer comment.
- [ ] Valid submit shows `Correction request queued for candidate`.
- [ ] View/Hide sent comment toggles latest comment visibility.
- [ ] Cancel hides the draft and preserves prior document state.

## 6. Missing-document acceptance flow

- [ ] Verify on `Not uploaded` reveals the acceptance comment panel.
- [ ] Verify on `Doesn't exist` reveals the acceptance comment panel.
- [ ] The textarea receives focus when revealed.
- [ ] Empty or whitespace-only acceptance comments are invalid.
- [ ] Invalid acceptance state appears near the textarea.
- [ ] Submit is disabled or blocked until valid.
- [ ] Valid submit changes state to `Verified`.
- [ ] Valid submit stores and displays the acceptance comment.
- [ ] Unverify returns to the prior missing-document state.
- [ ] Cancel hides the acceptance draft and preserves the prior document state.

## 7. Field verification

- [ ] Every field value is editable.
- [ ] Editing a field value marks it as edited in the session.
- [ ] Editing does not automatically check or uncheck the field.
- [ ] Each field has an independent confirmation checkbox.
- [ ] Checked fields show `Confirmed`.
- [ ] Unchecked fields show `Confirm`.
- [ ] Field checkbox changes update blockers and group completion.

## 8. Completion and blockers

- [ ] A document is complete only when state is `Verified`.
- [ ] A field is complete only when checked.
- [ ] A group is complete only when all documents are verified and all fields are checked.
- [ ] Overall progress updates after document and field changes.
- [ ] Selected-group blocker chips update after every relevant action.
- [ ] Invalid reopen draft adds a reopen-comment blocker.
- [ ] Invalid acceptance draft adds an acceptance-comment blocker.
- [ ] Completed groups show calm complete-state text.

## 9. Accessibility and Lightning readiness

- [ ] Group cards are keyboard-operable.
- [ ] Document tabs and file tabs expose selected state.
- [ ] Buttons have meaningful labels.
- [ ] Status is visible in text, not color alone.
- [ ] Validation messages are adjacent to their fields.
- [ ] Focus order follows the visual workflow.
- [ ] The implementation uses Lightning base components and SLDS where appropriate.
- [ ] Custom CSS is scoped and minimal.
- [ ] Production-only concerns are documented rather than hardcoded into mock behavior.
