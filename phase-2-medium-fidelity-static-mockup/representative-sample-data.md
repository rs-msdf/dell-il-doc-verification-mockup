# Representative Sample Data

This sample data plan gives Phase 2 enough realistic content to build a medium-fidelity static mockup. It covers all five groups, 12 required document items, 10 uploaded file entries, all major document states, and both checked and unchecked field states.

## Applicant

| Field | Value |
| --- | --- |
| Applicant name | Dana Levi |
| Application reference | APP-2026-0148 |
| Program | Dell IL Tech Leaders |
| Review status | Verification in progress |
| Overall progress | 2 of 5 groups complete |

## Group summary data

| Group | Documents complete | Fields complete | Group state | Blocker count |
| --- | --- | --- | --- | --- |
| Applicant ID | 1 of 3 | 4 of 6 | Incomplete | 4 |
| Parent 1 ID | 3 of 3 | 1 of 1 | Complete | 0 |
| Parent 2 ID | 1 of 3 | 1 of 1 | Incomplete | 2 |
| Applicant Income | 0 of 2 | 0 of 1 | Incomplete | 3 |
| Applicant Disability Status | 1 of 1 | 1 of 1 | Complete | 0 |

## Document item data

| Group | Document | State | Uploaded files | Applicant comment | Preview treatment |
| --- | --- | --- | --- | --- | --- |
| Applicant ID | ID | `Verified` | 1 | `Clear scan of front ID.` | Show selected file preview. |
| Applicant ID | Back of ID | `Uploaded` | 2 | `I uploaded a clearer back-side image after the first scan was blurry.` | Show latest selected file preview. |
| Applicant ID | ID appendix | `Not uploaded` | 0 | `I do not currently have an appendix document.` | Preview unavailable, no file uploaded. |
| Parent 1 ID | ID | `Verified` | 1 | `Parent 1 front ID attached.` | Show selected file preview. |
| Parent 1 ID | Back of ID | `Verified` | 1 | `Parent 1 back ID attached.` | Show selected file preview. |
| Parent 1 ID | ID appendix | `Verified` | 0 | `Parent 1 does not have an appendix.` | No preview because document is absent but verified as acceptable. |
| Parent 2 ID | ID | `Verified` | 1 | `Parent 2 front ID attached.` | Show selected file preview. |
| Parent 2 ID | Back of ID | `Reopened` | 1 | `Original upload was the wrong side.` | Show previous file with reopened status. |
| Parent 2 ID | ID appendix | `Doesn't exist` | 0 | `Parent 2 has no appendix document.` | No preview, comment-only context. |
| Applicant Income | Income statement | `Uploaded` | 2 | `June statement uploaded; May version also included.` | Show latest selected file preview. |
| Applicant Income | Benefits statement | `Not uploaded` | 0 | `Waiting for National Insurance statement.` | Preview unavailable, no file uploaded. |
| Applicant Disability Status | Disability certificate | `Verified` | 1 | `Certificate from the National Insurance Institute.` | Show selected file preview. |

## Uploaded file entries

| Document item | Filename | Upload label | Uploaded date | Static selected state |
| --- | --- | --- | --- | --- |
| Applicant ID / ID | `id-front-2026-06-15.pdf` | Initial upload | 2026-06-15 | No |
| Applicant ID / Back of ID | `back-id-replacement-2026-06-24.pdf` | Applicant replacement | 2026-06-24 | Yes |
| Applicant ID / Back of ID | `back-id-initial-2026-06-15.pdf` | Initial upload | 2026-06-15 | No |
| Parent 1 ID / ID | `parent1-id-front-2026-06-12.pdf` | Initial upload | 2026-06-12 | No |
| Parent 1 ID / Back of ID | `parent1-id-back-2026-06-12.pdf` | Initial upload | 2026-06-12 | No |
| Parent 2 ID / ID | `parent2-id-front-2026-06-13.pdf` | Initial upload | 2026-06-13 | No |
| Parent 2 ID / Back of ID | `parent2-id-back-wrong-side-2026-06-13.pdf` | Initial upload | 2026-06-13 | No |
| Applicant Income / Income statement | `income-june-2026-06-25.pdf` | Applicant replacement | 2026-06-25 | No |
| Applicant Income / Income statement | `income-may-2026-05-28.pdf` | Initial upload | 2026-05-28 | No |
| Applicant Disability Status / Disability certificate | `disability-certificate-2026-06-10.pdf` | Initial upload | 2026-06-10 | No |

The static screen only needs to show selected state for the selected document item. Other files can appear in supporting static examples or sample-data notes.

The current Phase 2 UI shows uploaded-file tabs with timestamp only in the main comparison row. The `Upload label` column remains in sample data so later interactive phases can restore explicit file-history reasons if stakeholders need them.

## Application field data

| Group | Field | Current value | Static verification state | Notes |
| --- | --- | --- | --- | --- |
| Applicant ID | First name | Dana | Checked | Matches ID. |
| Applicant ID | Last name | Levi | Checked | Matches ID. |
| Applicant ID | ID number | 031245678 | Checked | Matches ID. |
| Applicant ID | Date of birth | 1999-04-18 | Unchecked | Reviewer still needs to confirm against ID. |
| Applicant ID | Marital status | Single | Unchecked | Needs evidence review. |
| Applicant ID | Number of children under 18 | 0 | Checked | Editable control visible. |
| Parent 1 ID | Number of siblings under 24 years of age | 2 | Checked | Complete group example. |
| Parent 2 ID | Number of siblings under 24 years of age | 2 | Checked | Same label as Parent 1 by requirement. |
| Applicant Income | Applicant income | 4,850 NIS/month | Unchecked | Requires income and benefits documents. |
| Applicant Disability Status | Applicant disability percentage | 40% | Checked | Complete group example. |

## Blocker data by group

| Group | Unverified documents | Unchecked fields | Reopen comments | Review context |
| --- | --- | --- | --- | --- |
| Applicant ID | Back of ID: `Uploaded`; ID appendix: `Not uploaded` | Date of birth; Marital status | None pending | ID appendix has no preview. |
| Parent 1 ID | None | None | None | ID appendix has no preview but is verified. |
| Parent 2 ID | Back of ID: `Reopened`; ID appendix: `Doesn't exist` | None | Back of ID reopen comment exists from prior action; no pending input in static view. | ID appendix is comment-only context. |
| Applicant Income | Income statement: `Uploaded`; Benefits statement: `Not uploaded` | Applicant income | None pending | Benefits statement has no preview. |
| Applicant Disability Status | None | None | None | None. |
