# Consolidated Requirements

These requirements combine the root requirements and Phase 1-4 planning artifacts into one LWC implementation target.

## 1. Scope and actor

- Primary user: verification reviewer.
- Domain: Dell IL Tech Leaders scholarship document verification.
- Typical application volume: 10-20 documents.
- Platform target: Salesforce Lightning Web Components.
- Desktop-first experience. Mobile-specific layouts are out of scope for the original mockup, but LWC implementation should remain usable at narrower widths where practical.
- Backend architecture, OCR/ML extraction, final persistence, production notification infrastructure, permissions, audit storage, and secure file rendering are outside this handoff unless provided by the Salesforce project.

## 2. Reviewer responsibilities

The workspace must support two coordinated checks:

- Document-level verification: confirm that each required document is correct, readable, and belongs to the relevant person.
- Application consistency verification: confirm that application values match the evidence in the relevant documents.

The UI must keep document validity and field consistency together in one group workflow to reduce context switching.

## 3. Verification groups

Render these five groups:

| Group | Required documents | Fields |
| --- | --- | --- |
| Applicant ID | ID, Back of ID, ID appendix | First name, Last name, ID number, Date of birth, Marital status, Number of children under 18 |
| Parent 1 ID | ID, Back of ID, ID appendix | Number of siblings under 24 years of age |
| Parent 2 ID | ID, Back of ID, ID appendix | Number of siblings under 24 years of age |
| Applicant Income | Income statement, Benefits statement | Applicant income |
| Applicant Disability Status | Disability certificate | Applicant disability percentage |

Parent 1 ID and Parent 2 ID intentionally use the same field wording.

## 4. Summary page requirements

The summary page must:

- Show applicant identity, application ID, program name, and overall group progress.
- Show all five verification groups as clear selectable cards.
- Show each group's complete/incomplete status.
- Show document completion count and field completion count per group.
- Show missing-work text that is actionable, for example `2 documents need review` and `2 fields unchecked`.
- Open a group drilldown when a group card is selected.

## 5. Group drilldown requirements

The drilldown page must:

- Provide a clear back button to return to the group summary.
- Preserve current state while navigating between summary and drilldown.
- Show selected group name and complete/incomplete status.
- Show blocker chips for unverified documents, unchecked fields, required reopen comment, required acceptance comment, and total blockers.
- Show required document tabs for the selected group.
- Show the selected document's state badge, applicant comment, file history, preview/no-preview state, and valid actions.
- Show all fields in the selected group with editable values and independent confirmation checkboxes.

## 6. Document item and file requirements

- A required document item represents one document type, such as `Back of ID`.
- One required document item can have multiple uploaded files over time.
- Uploaded files may represent initial uploads, applicant replacements, or requested correction replacements.
- Uploaded-file tabs should preserve timestamp-only labels in the compact row.
- The preview header/footer can expose filename, upload label, and timestamp for confidence.
- Include a compact icon-only `View full screen` or equivalent preview-inspection affordance beside uploaded-file tabs. It may be disabled or a no-op in the mock implementation when no production file viewer exists.
- The selected uploaded file controls the preview shown.
- For documents with no uploaded files, show a no-preview state.
- For `Doesn't exist`, no preview is displayed; reviewer uses applicant comment and surrounding group context.
- Applicant comments must be visible for every selected document.

## 7. Document states

Allowed document states:

- `Not uploaded`
- `Uploaded`
- `Doesn't exist`
- `Reopened`
- `Verified`

Initial state is normally `Not uploaded`, but sample data should include every state.

## 8. Applicant and external data transitions

These transitions can arrive from applicant activity or refreshed Salesforce data. They must not be exposed as reviewer decision buttons unless the production workflow explicitly adds staff-side upload controls later.

| Current state | External event | Result |
| --- | --- | --- |
| `Not uploaded` | Applicant uploads a file | `Uploaded` |
| `Not uploaded` | Applicant marks the document as not existing | `Doesn't exist` |
| `Reopened` | Applicant uploads a requested correction replacement | `Uploaded` |

When `Reopened -> Uploaded` occurs, preserve prior reviewer comments as sent correction history, add the replacement file to uploaded-file history, select the latest uploaded file by default unless the reviewer has an active selection rule to preserve, and recalculate blockers and progress.

## 9. Reviewer transitions

Expose only valid actions for the current document state:

| Current state | Action | Result | Comment required |
| --- | --- | --- | --- |
| `Not uploaded` | Verify | `Verified` | Yes, acceptance comment |
| `Uploaded` | Verify | `Verified` | No |
| `Uploaded` | Reopen | `Reopened` | Yes, correction comment |
| `Doesn't exist` | Verify | `Verified` | Yes, acceptance comment |
| `Doesn't exist` | Reopen | `Reopened` | Yes, correction comment |
| `Reopened` | Verify | `Verified` | No |
| `Verified` | Unverify | `Uploaded`, `Not uploaded`, or `Doesn't exist` | No |
| `Verified` | Reopen | `Reopened` | Yes, correction comment |

Unsupported transitions must not appear as active controls.

## 10. Reopen behavior

- Reopen reveals an inline correction comment panel directly under the document decision controls.
- A non-empty reviewer comment is required before sending.
- `Send correction request` must be disabled or blocked while the comment is empty.
- On submit, set the document to `Reopened`.
- Store the reviewer comment with timestamp-like metadata.
- Show simulated feedback: `Correction request queued for candidate`.
- Show a control to view/hide the latest sent correction comment for reopened documents.
- Cancel hides the draft and preserves the prior document state.

## 11. Missing-document acceptance behavior

- `Not uploaded` and `Doesn't exist` documents may be verified only after the reviewer enters an explanatory acceptance comment.
- The acceptance comment panel appears directly under the decision controls.
- The comment must explain why absence is acceptable for this application.
- On submit, store the comment with timestamp-like metadata and set the document to `Verified`.
- Preserve whether the verified missing document came from `Not uploaded` or `Doesn't exist` so Unverify returns to the right state.
- Cancel hides the acceptance draft and preserves the prior document state.

## 12. Field verification requirements

- For each field, show the current application value.
- The reviewer can edit the value.
- Editing a value marks it as edited in the session.
- Editing does not automatically verify or unverify the field.
- Each field has an explicit confirmation checkbox.
- A field is complete only when checked.
- Checked label should read `Confirmed`; unchecked label should read `Confirm`.

## 13. Completion and progress requirements

- A document is complete only when its state is `Verified`.
- A field is complete only when its confirmation checkbox is checked.
- A group is complete only when all group documents are `Verified` and all group fields are checked.
- Overall progress is the count of complete groups out of total groups.
- Completion text must be derived from state, not hardcoded.

## 14. Blocker visibility requirements

Incomplete groups must surface actionable blockers by category:

- Documents not yet verified.
- Fields not yet checked.
- Required reopen comment while an invalid reopen draft is active.
- Required missing-document acceptance comment while an invalid acceptance draft is active.

When a group reaches completion, replace attention chips with calm complete-state chips such as `All documents verified` and `All fields confirmed`.

## 15. Accessibility requirements

- Group cards must be keyboard-operable buttons or equivalent single-action controls.
- Document and file tabs should expose selected state.
- Reopen and acceptance textareas should receive focus when revealed.
- Buttons must have meaningful accessible names.
- Status must not rely on color alone.
- Required comment validation must be visible near the field.
- Disabled or unavailable actions should either be hidden or explained consistently.

## 16. Visual requirements

- Use Lightning-compatible density, spacing, badges, forms, and status treatment.
- The visual style should be Lightning-inspired, not a strict clone of the React mockup.
- Keep document review and field review visually separate but coordinated.
- Attention states must be visible without overwhelming the reviewer.
- Complete states should be calm.
- Long labels, comments, and filenames must wrap without breaking controls.
