# Verification Requirements for Salesforce LWC Build

This is the requirements contract for implementing the Dell IL Tech Leaders verification reviewer workspace in Salesforce LWC. Focus on reviewer behavior, task types, state transitions, completion rules, validation, and visual interaction states. Do not treat local prototype technology choices as requirements.

## Applicant Context

Initial fixture identity for the reference experience:

| Field | Value |
| --- | --- |
| Applicant name | Dana Levi |
| Application reference | APP-2026-0148 |
| Program | Dell IL Tech Leaders |
| Initial progress | `2 of 14 tasks complete`, derived from state |

## Reviewer Goals

The workspace must help reviewers complete two coordinated checks:

- Document validity: the file is the correct required document, readable, and tied to the right person.
- Application consistency: submitted application values match the relevant evidence or accepted application context.

The UI should reduce uncertainty by making every decision explicit, traceable, and easy to justify.

## Verification Task Inventory

Render exactly these 14 verification tasks:

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

## Task Types

The UI must support these task types:

- Multi-document identity task: three required document items, several confirmation fields.
- Reused income task: two required document items and one confirmation field.
- Single-document evidence task: one required document item and one or more confirmation fields.
- Applicant absence task: a required document item can be marked `Doesn't exist` and can be accepted or reopened.
- Reopened correction task: a previously reviewed document is waiting for a candidate replacement and exposes the latest sent correction comment.
- Missing-upload task: a required document item is `Not uploaded` and can be accepted only with an acceptance comment.
- Address score override task: document-backed task with mostly read-only fields and a required override when the official address score is blank.
- Last-school score override task: field-only task with no documents and a required override when official school score data is blank.

## Summary View Requirements

The summary view must:

- Show applicant identity, application reference, program name, and overall task progress.
- Show all 14 verification tasks as selectable cards.
- Show each task's complete or incomplete status.
- Show document completion count and field completion count per task.
- Show actionable missing-work text such as `2 documents need review`, `1 field needs review`, or `No documents attached`.
- Open a focused drilldown workspace when a task card is selected.
- Stay separate from the drilldown view; the two views must not render at the same time.

## Task Drilldown Requirements

The drilldown view must:

- Provide a clear back button to return to the task summary without losing current state.
- Show selected task name, complete/incomplete status, and missing-work chips.
- Show required document tabs for document-backed tasks.
- Show an empty document state for field-only tasks with no attached documents.
- Show selected document state, applicant comment, uploaded-file history, preview/no-preview state, and valid actions when a document exists.
- Show all fields in the selected task.
- Keep document evidence and field review visually separate, usually side by side on desktop.

## Document Model

A required document item represents one document type, such as `Back of ID`. One required document item can have multiple uploaded files over time.

Allowed document states:

- `Not uploaded`
- `Uploaded`
- `Doesn't exist`
- `Reopened`
- `Verified`

Document state applies to the required document item, not to individual uploaded files.

Uploaded files may represent initial uploads, applicant replacements, or requested correction replacements. Uploaded-file tabs should remain compact and timestamp-first. Preview details can show filename, upload label, and timestamp.

## Document Actions and State Transitions

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

## Comments and Notifications

- Reopen requires a non-empty reviewer correction comment before the state changes.
- Missing-document verification from `Not uploaded` or `Doesn't exist` requires a non-empty acceptance comment.
- Reopen comment entry appears directly near the decision controls.
- Reopen creates a candidate notification or equivalent feedback where the target org supports it.
- Reopened documents expose the latest sent correction comment.
- Reviewer comments and applicant comments must remain visible in the relevant document context.

## Preview and Files

- The selected uploaded file controls the document preview.
- Documents with no uploaded files show a no-preview state.
- `Doesn't exist` documents show no preview; reviewer uses applicant comments and group context.
- Field-only tasks with no attached documents show an empty evidence state and no document actions.
- The preview area should include a disabled or no-op full-screen affordance until real file viewing exists.

## Field Review Modes

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

Confirmation fields:

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

Read-only fields with no confirmation checkbox:

| Task | Read-only fields |
| --- | --- |
| Address during last school year | Full address, Longitude, Latitude, Statistical area, Socio economic index, Socio economic index comments, Address score |
| Last school score | Last school name and district, Last school was in Israel, Last year of attendance, Last grade studied, School decile, School decile score |

Required override fields with no confirmation checkbox:

| Task | Required override field | When shown |
| --- | --- | --- |
| Address during last school year | Address score override | Shown and required when `Address score` is blank. |
| Last school score | Override last school score | Shown and required when official school decile or score data is blank. |

## Completion Logic

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

Field-only tasks have no documents, so document completion is vacuously complete and field requirements control completion. Top-level progress is the count of complete tasks out of total tasks, for example `2 of 14 tasks complete`. It must be derived from current state.

## Blockers

Incomplete tasks must surface actionable blockers by category:

- Documents not yet verified.
- Fields whose configured completion requirement is not met.
- Required reopen comment while an invalid reopen draft is active.
- Required missing-document acceptance comment while an invalid acceptance draft is active.

When a task reaches completion, attention chips should be replaced with calm complete-state chips such as `All documents verified`, `No documents attached`, and `Field requirements complete`.

## Sample Coverage Requirements

The implemented or testable reference state should cover:

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

## Validation Checklist

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
- Reopen stores the comment and shows candidate notification feedback or an org-equivalent status.

Completion:

- Editing a standard field does not automatically complete it.
- Checking or unchecking a standard field updates blockers and task completion.
- Reopening or unverifying a verified document makes its task incomplete.
- Verifying required documents can make a task complete when field requirements are complete.
- Filling `Override last school score` makes `Last school score` complete.
- Overall progress is derived from current completed tasks.

Accessibility and UX quality:

- Task cards must be keyboard-operable buttons or equivalent controls.
- Focus order should follow the visual workflow: header, task cards, back button, document tabs, file tabs, preview, actions, fields.
- Active document and file tabs need clear focus and selected states.
- Reopen and acceptance textareas should receive focus when revealed.
- Buttons must have meaningful accessible names.
- Status must not rely on color alone.
- Required comment validation must be visible near the field.
- Long labels, comments, and file names must wrap without breaking controls.
- The summary should remain scannable for applications with 10-20 total documents.

## Out of Scope Unless the Org Already Provides It

- OCR, ML extraction, or automated document parsing.
- Real candidate email delivery beyond showing or invoking the org's available correction-request path.
- Production file viewer behavior beyond a preview/no-preview affordance.
- New audit, permission, concurrency, or persistence rules that are not already defined by the Salesforce org or project stakeholders.

## Open Questions to Preserve

- Where are document states, field edits, comments, reviewer identity, and timestamps stored?
- Are field edits saved immediately, staged per group, or submitted as a full review transaction?
- What audit trail is required for Verify, Reopen, Unverify, and acceptance decisions?
- Should Unverify require a reason?
- Are candidate correction notifications immediate or batched?
- Which file types must be previewed inline, and what fallback appears for unsupported files?
- How should the UI handle concurrent reviewers on the same application?
- What wording is acceptable for correction requests and missing-document acceptance?