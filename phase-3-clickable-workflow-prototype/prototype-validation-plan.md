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
- Selected group styling follows the focused workspace.
- Returning to a changed group preserves prior state.
- Document tabs update selected document content.
- Uploaded-file tabs update selected preview content.

Action checks:

- `Uploaded` documents expose Verify and Reopen.
- `Verified` documents expose Reopen but not Verify.
- `Doesn't exist` documents expose Verify and Reopen with no preview.
- `Not uploaded` documents expose no reviewer decision actions.
- `Reopened` documents expose no reviewer decision actions until applicant replacement is simulated in a later phase.

Validation checks:

- Reopen cannot submit without a comment.
- Reopen stores the comment after submission.
- Simulated notification feedback appears after reopen submission.
- Clearing or canceling a reopen draft restores the prior selected-document state.

Completion checks:

- Group completion requires all documents to be `Verified`.
- Group completion requires all fields to be checked.
- Editing a field does not automatically check it.
- Unchecking a field in a complete group makes the group incomplete.
- Reopening a verified document in a complete group makes the group incomplete.
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
