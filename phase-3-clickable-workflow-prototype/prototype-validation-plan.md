# Phase 3 Prototype Validation Plan

## 1. Validation purpose

Phase 3 validation should test whether the clickable workflow makes reviewer decisions understandable and whether completion logic behaves correctly as state changes.

The validation focus is workflow clarity, not visual polish.

## 2. Reviewer walkthrough script

### Scenario A: Complete part of Applicant ID

1. Open Applicant ID.
2. Select Back of ID.
3. Switch between both uploaded files.
4. Verify Back of ID.
5. Confirm Date of birth.
6. Confirm Marital status.
7. Observe remaining blocker count.

Expected result:

- Back of ID changes from `Uploaded` to `Verified`.
- File switching updates the visible preview before verification.
- Field confirmations reduce unchecked-field blockers.
- Applicant ID remains incomplete because ID appendix is still `Not uploaded`.

### Scenario B: Reopen a verified document

1. Open Parent 1 ID.
2. Select ID.
3. Click Reopen.
4. Attempt to submit without a comment.
5. Enter a clear correction comment.
6. Submit the correction request.

Expected result:

- Empty comment is blocked.
- Valid comment changes ID from `Verified` to `Reopened`.
- Simulated candidate-notification feedback appears.
- Parent 1 ID changes from complete to incomplete.
- Overall progress decreases by one completed group.

### Scenario C: Accept a `Doesn't exist` document

1. Open Parent 2 ID.
2. Select ID appendix.
3. Confirm that no preview is shown.
4. Verify the document based on comment-only context.

Expected result:

- `Verify` is available.
- `Reopen` is available.
- No preview appears.
- Verification changes ID appendix from `Doesn't exist` to `Verified`.
- Parent 2 remains incomplete because Back of ID is still `Reopened`.

### Scenario D: Edit and confirm income field

1. Open Applicant Income.
2. Select Income statement.
3. Switch uploaded files.
4. Edit Applicant income.
5. Confirm Applicant income.
6. Verify Income statement.

Expected result:

- Edited field marker appears.
- Field confirmation is a separate action from editing.
- Income statement changes to `Verified`.
- Applicant Income remains incomplete because Benefits statement is `Not uploaded`.

### Scenario E: Reopen a disability certificate

1. Open Applicant Disability Status.
2. Select Disability certificate.
3. Reopen with a valid comment.

Expected result:

- The simple complete group becomes incomplete.
- Overall progress updates immediately.
- Reopen comment and notification feedback are visible.

## 3. Acceptance checks

Navigation checks:

- All five group cards are clickable.
- Group cards show document and field progress plus missing-work details instead of a generic blocker count.
- The summary page shows the five group cards without rendering a group workspace below them.
- Clicking a group card opens a separate focused workspace page for that group.
- The focused workspace back button returns to the summary page.
- Returning to a changed group preserves prior state.
- Document tabs update selected document content.
- Uploaded-file tabs update selected preview content.

Action checks:

- `Uploaded` documents expose Verify and Reopen.
- `Verified` documents expose Reopen and Unverify, but not Verify.
- Unverify changes a `Verified` document back to `Uploaded` when files exist, `Not uploaded` when no file exists, or `Doesn't exist` when the applicant previously marked the missing document that way.
- `Doesn't exist` documents expose Verify and Reopen with no preview, and Verify requires an acceptance comment.
- `Not uploaded` documents expose Verify with no preview, and Verify requires an acceptance comment.
- `Reopened` documents expose Verify and a control to view the latest sent correction comment.

Validation checks:

- Reopen cannot submit without a comment.
- Reopen comment entry appears directly below the document decision controls, not at the bottom of the evidence pane.
- `Doesn't exist` verification cannot submit without an acceptance comment explaining why no upload is acceptable.
- Reopen stores the comment after submission.
- Reopened documents allow the reviewer to view the latest sent correction comment from the action area.
- Simulated notification feedback appears after reopen submission.
- Clearing or canceling a reopen draft restores the prior selected-document state.

Completion checks:

- Group completion requires all documents to be `Verified`.
- Group completion requires all fields to be checked.
- Editing a field does not automatically check it.
- Unchecking a field in a complete group makes the group incomplete.
- Reopening a verified document in a complete group makes the group incomplete.
- Verifying a reopened document can make its group complete again when all fields and other documents are complete.
- Unverifying a verified document makes the document and group incomplete until it is verified again.
- Overall progress is derived from current completed groups.

## 4. Confusion log template

Use this structure when testing with reviewers or stakeholders:

| Observation | Scenario | Severity | Proposed response | Owner |
| --- | --- | --- | --- | --- |
|  |  | Low / Medium / High |  |  |

Capture observations for:

- Actions that reviewers do not notice.
- States that reviewers misinterpret.
- Completion changes that feel surprising.
- Reopen comment requirements that are unclear.
- Places where timestamp-only file tabs are insufficient.
- Any blocker count that does not feel actionable.

## 5. Phase 3 completion review

Before Phase 3 is considered complete, run the walkthrough scenarios and record:

- Which scenarios passed without prototype changes.
- Which scenarios required wording, layout, or interaction changes.
- Which open questions should move into Phase 4 high-fidelity refinement.
- Which implementation gaps should move into Phase 5 full functional mockup planning.

## 6. Implementation validation result

Phase 3 implementation validation was run against the local Vite app with a headless Playwright walkthrough covering Scenarios A-E.

Result: all five scenarios passed after implementation.

Additional navigation result: the two-page summary/drilldown smoke test passed. The summary page rendered exactly five group cards with no workspace below it, clicking Applicant Income opened only that drilldown workspace, the back button returned to the summary, and returning to Applicant Income preserved the selected uploaded-file tab.

Additional transition result: the reverse-transition smoke test passed. A verified Applicant ID document with files returned to `Uploaded`, a verified no-file document accepted from `Not uploaded` returned to `Not uploaded`, and a verified no-file document previously marked `Doesn't exist` by the applicant returned to `Doesn't exist`.

Additional reopen-entry result: the inline reopen comment flow smoke test passed. Clicking `Reopen` opened the required comment field directly below the decision buttons, empty submission validation appeared in place, and submitting a valid comment still stored the reviewer comment and notification feedback.

Additional reopened-state result: the reopened document smoke test passed. A `Reopened` Parent 2 Back of ID exposed `Verify` and `View sent comment`, revealed the latest correction comment in the action area, then moved to `Verified` after verification and removed the reopened-only sent-comment control.

Additional `Doesn't exist` acceptance result: the missing-document acceptance smoke test passed. The `Doesn't exist` badge matched the `Not uploaded` badge styling, clicking `Verify` opened a required acceptance comment, submission stayed disabled until a comment was entered, and the accepted document stored the missing-document acceptance comment after moving to `Verified`.

- Scenario A passed: Applicant ID file switching, document verification, and independent field confirmation updated blockers as expected.
- Scenario B passed: reopening a verified Parent 1 document blocked empty submission, accepted a valid comment, stored notification feedback, and reduced overall progress.
- Scenario C passed: a `Doesn't exist` Parent 2 appendix showed no preview and could be accepted as verified.
- Scenario D passed: Applicant Income file switching, field editing, field confirmation, and uploaded-document verification behaved independently.
- Scenario E passed: reopening the disability certificate changed the complete group back to incomplete and updated overall progress.

No product confusion issues were identified during the automated walkthrough. The open prototype questions listed in `prototype-data-plan.md` remain candidates for Phase 4 stakeholder review.
