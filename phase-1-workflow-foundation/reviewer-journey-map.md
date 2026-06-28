# Reviewer Journey Map

This journey map defines the Phase 1 reviewer flow from opening an assigned application through application-level completion. It focuses on what the reviewer needs to understand at each point in the workflow, not on later clickable behavior.

| Step | Reviewer objective | Visible information | Key decision | Possible blocker |
| --- | --- | --- | --- | --- |
| 1. Open assigned application | Start verification for one candidate. | Applicant identity, application reference, assigned verification context. | Confirm this is the correct application to review. | Application metadata missing or unclear. |
| 2. Check overall progress | Understand how much verification work remains. | Group-based progress, such as `2 of 5 groups complete`. | Decide which incomplete group to review next. | Progress could be misleading if based on document counts instead of complete groups. |
| 3. Select verification group | Enter one grouped review context. | Five groups with complete or incomplete status: Applicant ID, Parent 1 ID, Parent 2 ID, Applicant Income, Applicant Disability Status. | Choose the group that needs review. | Group status lacks enough signal to explain why it is incomplete. |
| 4. Review expected documents | Confirm required document coverage for the group. | Expected document names, current document states, selected document item, applicant comments, uploaded-file list where available. | Decide which document item needs attention. | Required document is `Not uploaded`, `Reopened`, or otherwise not ready for verification. |
| 5. Inspect comments and preview | Determine whether the submitted evidence is reviewable and relevant. | Applicant comment content, selected uploaded file, document preview when a file exists, no-preview treatment for `Doesn't exist`. | Decide whether the document can support verification. | No file is available, preview is not applicable, or applicant comment is the only evidence. |
| 6. Compare evidence to fields | Check consistency between document evidence and submitted application data. | Related application fields, submitted values, editable controls, separate verified checkboxes. | Decide whether values are correct, need editing, and can be checked as verified. | Evidence conflicts with current value or reviewer has not explicitly checked the field. |
| 7. Identify missing decisions | See what prevents the group from completing. | Blocker list grouped by unverified documents, unchecked fields, no-preview context, and required reopen comments when relevant. | Decide which blocker to resolve next. | Blockers are hidden inside document or field panels instead of summarized. |
| 8. Understand group state | Confirm whether the selected group is complete, incomplete, or blocked. | Selected group summary with completion state and missing completion items. | Decide whether to continue in the group or move elsewhere. | A group appears visually complete even though one field checkbox is unchecked. |
| 9. Move to another group | Continue review while preserving overall awareness. | Persistent group navigation and application-level group progress. | Select another incomplete group or revisit a completed group. | Reviewer loses context after switching groups. |
| 10. Reach application completion | Finish verification only when all groups are complete. | `5 of 5 groups complete`, all group statuses complete, no selected-group blockers. | Treat the application as verification-ready. | One group remains incomplete because a document is not `Verified` or a field is unchecked. |

## Journey principles

- The reviewer should always know which group is selected, whether it is complete, and what remains.
- Document validity checks and field consistency checks should be visible in the same workspace, side by side.
- Per-document state handling must remain visible even though the primary workflow is grouped.
- Completion is explicit: inferred confidence is not enough. Documents must be `Verified`; fields must be checked as verified.
