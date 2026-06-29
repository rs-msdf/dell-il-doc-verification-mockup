# Phase 3 Prototype Data Plan

## 1. Data goals

Phase 3 needs stateful sample data that lets a reviewer exercise all required interactions without external services.

The data should preserve the Phase 2 Dana Levi scenario while expanding it enough that every group can be opened, reviewed, modified, and completed or blocked.

## 2. Applicant fixture

| Field | Value |
| --- | --- |
| Applicant name | Dana Levi |
| Application reference | APP-2026-0148 |
| Program | Dell IL Tech Leaders |
| Summary status display | Derived group progress only; no separate review-status chip. |
| Initial progress | Derived from fixture, expected to begin as 2 of 5 groups complete |

## 3. Group fixture coverage

| Group | Initial documents | Initial fields | Initial purpose |
| --- | --- | --- | --- |
| Applicant ID | 1 of 3 verified | 4 of 6 checked | Rich default workspace with uploaded, verified, not-uploaded, multi-file, checked, unchecked, and edited states. |
| Parent 1 ID | 3 of 3 verified | 1 of 1 checked | Complete group example that can be reopened to test regression from complete to incomplete. |
| Parent 2 ID | 1 of 3 verified | 1 of 1 checked | Reopened and `Doesn't exist` document example. |
| Applicant Income | 0 of 2 verified | 0 of 1 checked | Incomplete financial document example with multiple files and missing benefit statement. |
| Applicant Disability Status | 1 of 1 verified | 1 of 1 checked | Simple complete group example. |

## 4. Required document fixtures

### Applicant ID

| Document | Initial state | Files | Comment | Phase 3 interaction coverage |
| --- | --- | --- | --- | --- |
| ID | `Verified` | 1 | `Clear scan of front ID.` | Reopen from verified with required comment. |
| Back of ID | `Uploaded` | 2 | `I uploaded a clearer back-side image after the first scan was blurry.` | Verify, reopen, file switching. |
| ID appendix | `Not uploaded` | 0 | `I do not currently have an appendix document.` | Verify with required acceptance comment, no preview. |

### Parent 1 ID

| Document | Initial state | Files | Comment | Phase 3 interaction coverage |
| --- | --- | --- | --- | --- |
| ID | `Verified` | 1 | `Parent 1 front ID attached.` | Reopen complete group. |
| Back of ID | `Verified` | 1 | `Parent 1 back ID attached.` | Reopen complete group. |
| ID appendix | `Verified` | 0 | `Parent 1 does not have an appendix.` | Verified comment-only absence. |

### Parent 2 ID

| Document | Initial state | Files | Comment | Phase 3 interaction coverage |
| --- | --- | --- | --- | --- |
| ID | `Verified` | 1 | `Parent 2 front ID attached.` | Verified baseline. |
| Back of ID | `Reopened` | 1 | `Original upload was the wrong side.` | Sent-comment viewing, verification from reopened state, and prior reviewer comment. |
| ID appendix | `Doesn't exist` | 0 | `Parent 2 has no appendix document.` | Verify or reopen a comment-only document. |

### Applicant Income

| Document | Initial state | Files | Comment | Phase 3 interaction coverage |
| --- | --- | --- | --- | --- |
| Income statement | `Uploaded` | 2 | `June statement uploaded; May version also included.` | Verify, reopen, file switching. |
| Benefits statement | `Not uploaded` | 0 | `Waiting for National Insurance statement.` | Missing document blocker. |

### Applicant Disability Status

| Document | Initial state | Files | Comment | Phase 3 interaction coverage |
| --- | --- | --- | --- | --- |
| Disability certificate | `Verified` | 1 | `Certificate from the National Insurance Institute.` | Simple complete group, reopen regression. |

## 5. Uploaded-file fixture rules

- Keep the Phase 2 filenames and upload dates.
- Store upload labels internally, even when the UI renders timestamp-only tabs.
- Select the latest uploaded file by default for each document.
- Preserve selected file per document after the reviewer changes tabs.
- Documents without uploaded files should have an empty file array and no selected file.

## 6. Field fixture coverage

| Group | Field | Initial value | Initial checked | Interaction coverage |
| --- | --- | --- | --- | --- |
| Applicant ID | First name | Dana | Yes | Can uncheck or edit. |
| Applicant ID | Last name | Levi | Yes | Can uncheck or edit. |
| Applicant ID | ID number | 031245678 | Yes | Can uncheck or edit. |
| Applicant ID | Date of birth | 1999-04-18 | No | Confirm to reduce blockers. |
| Applicant ID | Marital status | Single | No | Edit or confirm. |
| Applicant ID | Number of children under 18 | 0 | Yes | Starts as edited example. |
| Parent 1 ID | Number of siblings under 24 years of age | 2 | Yes | Complete group field. |
| Parent 2 ID | Number of siblings under 24 years of age | 2 | Yes | Same label as Parent 1. |
| Applicant Income | Applicant income | 4,850 NIS/month | No | Edit and confirm after document review. |
| Applicant Disability Status | Applicant disability percentage | 40% | Yes | Complete group field. |

## 7. Open prototype questions to capture during build

- Should editing a checked field automatically uncheck it, or should the prototype preserve the reviewer decision until explicitly changed?
- Should a verified document with multiple uploaded files remember which file was reviewed as the verified evidence?
- Should a `Doesn't exist` document that is verified show a distinct acceptance note or simply use the generic `Verified` state?
- Should reopen comments be visible in group cards, selected document details, or both?
- Should completion feedback be immediate only, or should the prototype also show a temporary confirmation message after a group becomes complete?
