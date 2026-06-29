# Requirements: Dell IL Tech Leaders Verification UI

This document is the root requirements source for the frontend-only document verification mockup.

## 1. Scope

- Primary user: verification reviewer.
- Domain: Dell IL Tech Leaders scholarship document verification.
- Typical application volume: 10-20 documents.
- Prototype platform: Vite + React + TypeScript, with local mock data and no backend dependency.
- Production context: eventual Salesforce Lightning Web Components implementation, but this repository remains a frontend mockup.
- Desktop-first experience. Mobile-specific design is out of scope, but layouts should avoid obvious overflow at narrower widths.

## 2. Reviewer Goals

The workspace must help reviewers make two coordinated checks in one flow:

- Document validity: the file is the correct required document, readable, and tied to the right person.
- Application consistency: submitted application values match the relevant evidence or accepted application context.

The UI should reduce uncertainty by making every decision explicit, traceable, and easy to justify.

## 3. Verification Tasks

Render these 14 verification tasks:

| Task | Required documents | Fields |
| --- | --- | --- |
| Applicant ID | ID, Back of ID, ID appendix | First name, Last name, ID number, Date of birth, Marital status, Number of children under 18 |
| Parent 1 ID | ID, Back of ID, ID appendix | Number of siblings under 24 years of age |
| Parent 2 ID | ID, Back of ID, ID appendix | Number of siblings under 24 years of age |
| Applicant Income | 2024 Income, 2024 Benefits | Total monthly income (gross) |
| Parent 1 Income | 2024 Income, 2024 Benefits | Total monthly income (gross) |
| Parent 2 Income | 2024 Income, 2024 Benefits | Total monthly income (gross) |
| Partner Income | 2024 Income, 2024 Benefits | Total monthly income (gross) |
| Family Member Disability | Disability certificate | Relation to applicant, Percent disability |
| Parent 1 Estrangement | Estrangement attestation | Parent 1 status |
| Parent 2 Estrangement | Estrangement attestation | Parent 2 status |
| Parent 1 Death Certificate | Death certificate | Parent 1 status |
| Parent 2 Death Certificate | Death certificate | Parent 2 status |
| Address during last school year | List of addresses | Full address, Longitude, Latitude, Statistical area, Socio economic index, Socio economic index comments, Address score, Address score override when Address score is blank |
| Last school score | Documents not required for this verification task | Last school name and district, Last school was in Israel, Last year of attendance, Last grade studied, School decile, School decile score, Override last school score |

Parent 1 ID and Parent 2 ID intentionally use the same field wording. Income tasks intentionally reuse the same document names and field wording for applicant, parents, and partner.

## 4. Summary Page

The summary page must:

- Show applicant identity, application reference, program name, and overall task progress.
- Show all 14 verification tasks as selectable cards.
- Show each task's complete or incomplete status.
- Show document completion count and field completion count per task.
- Show actionable missing-work text, such as `2 documents need review`, `1 field needs review`, or `No documents attached`.
- Open a focused drilldown workspace when a task card is selected.
- Keep the summary page and drilldown page separate; they should not render at the same time.

## 5. Task Drilldown

The drilldown page must:

- Provide a clear back button to return to the task summary without losing current state.
- Show selected task name, complete/incomplete status, and missing-work chips.
- Show required document tabs for document-backed tasks.
- Show an empty document state for field-only tasks with no attached documents.
- Show selected document state, applicant comment, uploaded-file history, preview/no-preview state, and valid actions when a document exists.
- Show all fields in the selected task.
- Keep document evidence and field review visually separate, usually side by side on desktop.

## 6. Document Model

A required document item represents one document type, such as `Back of ID`. One required document item can have multiple uploaded files over time.

Allowed document states:

- `Not uploaded`
- `Uploaded`
- `Doesn't exist`
- `Reopened`
- `Verified`

Document state applies to the required document item, not to individual uploaded files.

Uploaded files may represent initial uploads, applicant replacements, or requested correction replacements. Uploaded-file tabs should remain compact and timestamp-first. Preview details can show filename, upload label, and timestamp.

## 7. Document Actions

Reviewer actions must be derived from the selected document state:

| Current state | Available reviewer actions | Result | Comment required |
| --- | --- | --- | --- |
| `Not uploaded` | Verify | `Verified` | Yes, acceptance comment |
| `Uploaded` | Verify | `Verified` | No |
| `Uploaded` | Reopen | `Reopened` | Yes, correction comment |
| `Doesn't exist` | Verify | `Verified` | Yes, acceptance comment |
| `Doesn't exist` | Reopen | `Reopened` | Yes, correction comment |
| `Reopened` | Verify | `Verified` | No |
| `Verified` | Unverify | `Uploaded`, `Not uploaded`, or `Doesn't exist` | No |
| `Verified` | Reopen | `Reopened` | Yes, correction comment |

Unsupported actions should not appear as available actions.

Unverify must return a verified document to the correct reviewable state:

- Documents with uploaded files return to `Uploaded`.
- Missing documents accepted from `Not uploaded` return to `Not uploaded`.
- Missing documents previously marked `Doesn't exist` by the applicant return to `Doesn't exist`.

## 8. Comments and Notifications

- Reopen requires a non-empty reviewer correction comment before the state changes.
- Missing-document verification from `Not uploaded` or `Doesn't exist` requires a non-empty acceptance comment.
- Reopen comment entry appears directly near the decision controls.
- Reopen creates a simulated candidate notification in the prototype.
- Reopened documents expose the latest sent correction comment.
- Reviewer comments and applicant comments must remain visible in the relevant document context.

## 9. Preview and Files

- The selected uploaded file controls the document preview.
- Documents with no uploaded files show a no-preview state.
- `Doesn't exist` documents show no preview; reviewer uses applicant comments and group context.
- Field-only tasks with no attached documents show an empty evidence state and no document actions.
- The preview area should include a disabled or no-op full-screen affordance until real file viewing exists.

## 10. Field Review

Each field must belong to exactly one field review category:

| Category | UI treatment | Completion rule |
| --- | --- | --- |
| Confirmation field | Editable value plus explicit confirmation checkbox. Checked fields read `Confirmed`; unchecked fields read `Confirm`. | Complete when the confirmation checkbox is checked. |
| Read-only field | Static value display. Blank values render as `Blank`. No input and no confirmation checkbox. | Always complete because the reviewer cannot edit or confirm it. |
| Required override field | Editable value. No confirmation checkbox. Shows completion feedback only when a value is present. | Complete when the trimmed value is not empty. |

Standard evidence-backed confirmation fields must:

- Show the current application value.
- Allow reviewer edits.
- Mark edited values as edited in the current session.
- Keep editing separate from confirmation.
- Use an explicit confirmation checkbox where checked fields read `Confirmed` and unchecked fields read `Confirm`.

The following fields are confirmation fields:

| Task | Confirmation fields |
| --- | --- |
| Applicant ID | First name, Last name, ID number, Date of birth, Marital status, Number of children under 18 |
| Parent 1 ID | Number of siblings under 24 years of age |
| Parent 2 ID | Number of siblings under 24 years of age |
| Applicant Income | Total monthly income (gross) |
| Parent 1 Income | Total monthly income (gross) |
| Parent 2 Income | Total monthly income (gross) |
| Partner Income | Total monthly income (gross) |
| Family Member Disability | Relation to applicant, Percent disability |
| Parent 1 Estrangement | Parent 1 status |
| Parent 2 Estrangement | Parent 2 status |
| Parent 1 Death Certificate | Parent 1 status |
| Parent 2 Death Certificate | Parent 2 status |

Score override tasks are the exception:

- Read-only context fields do not require confirmation checkboxes.
- `Last school score` explicitly says `Documents not required for this verification task`, shows blank official decile fields, and completes when `Override last school score` is filled.
- `Address during last school year` shows read-only address lookup fields. When `Address score` is blank, `Address score override` is editable and required for task completion.

The following fields are read-only fields with no confirmation checkbox:

| Task | Read-only fields |
| --- | --- |
| Address during last school year | Full address, Longitude, Latitude, Statistical area, Socio economic index, Socio economic index comments, Address score |
| Last school score | Last school name and district, Last school was in Israel, Last year of attendance, Last grade studied, School decile, School decile score |

The following fields are required override fields with no confirmation checkbox:

| Task | Required override field | When shown |
| --- | --- | --- |
| Address during last school year | Address score override | Shown and required when `Address score` is blank. |
| Last school score | Override last school score | Shown and required when official school decile or score data is blank. |

## 11. Completion Logic

Document completion:

```text
documentComplete = document.state == "Verified"
```

Field completion:

```text
if field.verificationMode == "display-only": fieldComplete = true
if field.verificationMode == "value-presence": fieldComplete = trim(field.value) is not empty
otherwise: fieldComplete = field.checked == true
```

Task completion:

```text
taskComplete = every(task.documents, documentComplete)
            and every(task.fields, fieldComplete)
```

Field-only tasks have no documents, so document completion is vacuously complete and field requirements control completion.

Top-level progress is the count of complete tasks out of total tasks, for example `2 of 14 tasks complete`. It must be derived from current state, not hardcoded.

## 12. Blockers

Incomplete tasks must surface actionable blockers by category:

- Documents not yet verified.
- Fields whose configured completion requirement is not met.
- Required reopen comment while an invalid reopen draft is active.
- Required missing-document acceptance comment while an invalid acceptance draft is active.

When a task reaches completion, attention chips should be replaced with calm complete-state chips such as `All documents verified`, `No documents attached`, and `Field requirements complete`.

## 13. Prototype Sample Coverage

The local fixture data should cover:

- Complete and incomplete tasks.
- All allowed document states.
- Multiple uploaded files for at least two document items.
- Applicant comments and reviewer comments.
- Reopened document with a previous correction comment.
- `Doesn't exist` document with no preview.
- `Not uploaded` document requiring acceptance comment.
- Editable fields, checked fields, unchecked fields, and edited-in-session marker.
- Field-only tasks with no attached documents.
- Field-only last-school score override case.

Current fixture identity:

| Field | Value |
| --- | --- |
| Applicant name | Dana Levi |
| Application reference | APP-2026-0148 |
| Program | Dell IL Tech Leaders |

Initial progress should derive to `2 of 14 tasks complete`.

## 14. Validation Checklist

Navigation:

- All 14 task cards are clickable.
- Task cards show document and field progress plus missing-work details.
- Back navigation returns to the summary page without losing state.
- Document tabs and uploaded-file tabs update selected content.
- Field-only tasks open without crashing and show empty document/file states.

Actions:

- `Uploaded` documents expose Verify and Reopen.
- `Verified` documents expose Reopen and Unverify, but not Verify.
- `Doesn't exist` documents expose Verify and Reopen with no preview, and Verify requires an acceptance comment.
- `Not uploaded` documents expose Verify with no preview, and Verify requires an acceptance comment.
- `Reopened` documents expose Verify and a control to view the latest sent correction comment.
- Reopen cannot submit without a comment.
- Reopen stores the comment and shows simulated notification feedback.

Completion:

- Editing a standard field does not automatically complete it.
- Checking or unchecking a standard field updates blockers and task completion.
- Reopening or unverifying a verified document makes its task incomplete.
- Verifying required documents can make a task complete when field requirements are complete.
- Filling `Override last school score` makes `Last school score` complete.
- Overall progress is derived from current completed tasks.

## 15. Accessibility and UX Quality

- Task cards must be keyboard-operable buttons or equivalent controls.
- Focus order should follow the visual workflow: header, task cards, back button, document tabs, file tabs, preview, actions, fields.
- Active document and file tabs need clear focus and selected states.
- Reopen and acceptance textareas should receive focus when revealed.
- Buttons must have meaningful accessible names.
- Status must not rely on color alone.
- Required comment validation must be visible near the field.
- Long labels, comments, and file names must wrap without breaking controls.
- The summary should remain scannable for applications with 10-20 total documents.
- The visual language should remain compatible with Salesforce Lightning expectations.

## 16. Out of Scope

- Backend persistence and final Salesforce object model.
- OCR, ML extraction, or automated document parsing.
- Real candidate email delivery or notification infrastructure.
- Authentication, reviewer assignment, permissions, audit storage, or concurrency handling.
- Real file storage, secure file preview, or production full-screen viewer.
- Production LWC implementation details.

## 17. Open Production Questions

- Where are document states, field edits, comments, reviewer identity, and timestamps stored?
- Are field edits saved immediately, staged per group, or submitted as a full review transaction?
- What audit trail is required for Verify, Reopen, Unverify, and acceptance decisions?
- Should Unverify require a reason?
- Are candidate correction notifications immediate or batched?
- Which file types must be previewed inline, and what fallback appears for unsupported files?
- How should the UI handle concurrent reviewers on the same application?
- Which SLDS patterns and reusable component boundaries are required in a future LWC implementation?
- What wording is acceptable for correction requests and missing-document acceptance?
