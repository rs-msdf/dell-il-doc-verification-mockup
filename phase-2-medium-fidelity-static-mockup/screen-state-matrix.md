# Screen State Matrix

This matrix identifies where each required Phase 2 state should appear in the static mockup or supporting static examples.

## Main selected screen: Applicant ID

| Requirement | Static representation |
| --- | --- |
| Complete versus incomplete group status | Left navigation shows Applicant ID incomplete, Parent 1 complete, Parent 2 incomplete, Applicant Income incomplete, Applicant Disability Status complete. |
| Group progress count | Header shows `2 of 5 groups complete`. |
| Expected supporting documents | Applicant ID summary lists ID, back of ID, ID appendix. |
| Current document states | Applicant ID document rows show `Verified`, `Uploaded`, and `Not uploaded`. |
| Scrollable uploaded-file list | Back of ID selected with two files shown in a scrollable/list container. |
| Selected uploaded file | `back-id-replacement-2026-06-24.pdf` marked selected. |
| Applicant comments | Visible on all Applicant ID document rows or selected document details. |
| Document preview | Back of ID selected file preview shown. |
| Current field values | Six Applicant ID fields shown with current values. |
| Editable field inputs | All field values appear in input-like controls. |
| Separate verified checkboxes | Each field row has its own checkbox separate from the input. |
| Unchecked fields obvious | Date of birth and marital status unchecked and listed as blockers. |
| Missing completion items | Blocker area lists two unverified documents and two unchecked fields. |

## Supporting static states across all groups

| State or scenario | Where it appears | Notes |
| --- | --- | --- |
| Complete group | Parent 1 ID; Applicant Disability Status | Navigation marks complete and sample data has all documents and fields complete. |
| Incomplete group | Applicant ID; Parent 2 ID; Applicant Income | Navigation marks incomplete with blocker count. |
| `Verified` document | Applicant ID / ID; Parent 1 documents; Disability certificate | Green or success status. |
| `Uploaded` document needing action | Applicant ID / Back of ID; Applicant Income / Income statement | Attention status. |
| `Reopened` document | Parent 2 ID / Back of ID | Warning status and reopen comment context. |
| `Not uploaded` document | Applicant ID / ID appendix; Applicant Income / Benefits statement | Missing status and preview unavailable. |
| `Doesn't exist` document | Parent 2 ID / ID appendix | Neutral status, no preview, applicant-comment context. |
| Multiple uploaded files | Applicant ID / Back of ID; Applicant Income / Income statement | File history preserved. |
| Applicant comment-only review context | Parent 2 ID / ID appendix | No preview, comment-only context. |
| Checked field | Applicant ID / First name; Parent 1 sibling field; Disability percentage | Checkbox visibly checked. |
| Unchecked field | Applicant ID / Date of birth; Applicant Income / Applicant income | Checkbox visibly unchecked and listed as blocker. |
| Edited field value | Applicant ID / Number of children under 18 | Input-like control visible; checkbox remains a separate decision. |

## Static example priorities

If only one screen is produced in Phase 2, prioritize the Applicant ID selected state because it shows:

- Group navigation and progress.
- Rich field set.
- Verified, uploaded, and not-uploaded document states.
- Multiple uploaded files.
- Selected document preview.
- Checked and unchecked fields.
- Explicit blockers.

If additional static thumbnails or side notes are added, use them to show:

- Parent 2 ID with `Reopened` and `Doesn't exist` document states.
- Applicant Income with missing benefits statement and unchecked income field.
- Applicant Disability Status as a simple complete group.
