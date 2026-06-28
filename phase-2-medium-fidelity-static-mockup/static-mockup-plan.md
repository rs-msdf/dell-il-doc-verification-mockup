# Static Mockup Plan

## Primary static screen

The Phase 2 mockup should be one desktop reviewer workspace flow shown statically: a group overview followed by the opened `Applicant ID` workspace. Applicant ID remains the opened group because it has the richest field set and enough document variety to show the grouped workflow clearly.

The screen should be medium fidelity: realistic hierarchy, spacing, labels, statuses, and representative content, but no functional interactions.

Confirmed build direction:

- Build the actual static UI for Phase 2 now.
- Use a group overview and one opened Applicant ID workspace; omit lower-priority reference coverage panels from the UI.
- Keep the fictional Dana Levi sample data.
- Use explicit uploaded-file labels for traceability.
- Keep the style loosely Salesforce Lightning-inspired rather than a strict Salesforce clone.

## Screen layout

```text
+------------------------------------------------------------------------------------------------+
| Group Overview                                                                                  |
| Applicant ID | Parent 1 ID | Parent 2 ID | Applicant Income | Applicant Disability Status         |
| Status, document progress, field progress, and blocker count per group                           |
+------------------------------------------------------------------------------------------------+
| All document groups / Applicant ID                                                              |
+------------------------------------------------------------------------------------------------+
| Applicant ID Summary | 2 documents need verification | 2 fields unchecked | 4 blockers          |
+------------------------------------------------------------------------------------------------+
| Document Review                               | Document Preview + Uploaded File Tabs           |
| Expected documents, comments, controls         | File tabs and selected file review surface       |
+----------------------------------------------+-------------------------------------------------+
| Field Consistency Review                                                                          |
| Field rows with editable inputs and compact `Confirmed` / `Confirm` checkbox labels               |
+------------------------------------------------------------------------------------------------+
```

## Application header

The header should establish application context and completion status without turning into a dashboard.

Content:

- Applicant name: Dana Levi.
- Application reference: APP-2026-0148.
- Program: Dell IL Tech Leaders.
- Overall progress: `2 of 5 groups complete`.
- Optional compact status: `Verification in progress`.

Visual priority:

- Applicant name and application reference are primary.
- Progress is visible on the right as a badge or compact progress text.
- Do not use a percentage as the primary progress indicator.

## Group overview navigation

The group overview should list all five groups with status markers before the reviewer enters a focused group workspace.

Recommended static statuses:

| Group | Status | Optional blocker count |
| --- | --- | --- |
| Applicant ID | Incomplete, selected | 4 blockers |
| Parent 1 ID | Complete | 0 blockers |
| Parent 2 ID | Incomplete | 2 blockers |
| Applicant Income | Incomplete | 3 blockers |
| Applicant Disability Status | Complete | 0 blockers |

The blocker count is useful in Phase 2 as a static scanning aid, while complete/incomplete remains the minimum required status.

## Selected group summary

For the selected `Applicant ID` group, show:

- Group name: Applicant ID.
- Group state: Incomplete.
- Expected documents: ID, back of ID, ID appendix.
- Related fields: first name, last name, ID number, date of birth, marital status, number of children under 18.
- Missing summary: `2 documents need verification`, `2 fields unchecked`, `4 blockers`.

The summary should make the total missing work visible before the reviewer scans the full document and field areas. Specific blockers should remain visible on the affected document and field rows.

## Document review area

The selected group document list should show three document items:

| Document | State | Static treatment |
| --- | --- | --- |
| ID | `Verified` | Complete badge, selected-file preview available. |
| Back of ID | `Uploaded` | Attention badge, multiple uploaded files, selected latest file. |
| ID appendix | `Not uploaded` | Missing badge, applicant comment visible, preview unavailable. |

The selected document item should be `Back of ID` so the mockup can demonstrate uploaded-file tabs in the preview pane and the selected preview.

For each document item, show:

- Document name.
- State badge.
- Applicant comment snippet or full comment.
- File count when uploaded files exist.
- Decision controls as static disabled or visual-only buttons, such as `Verify` and `Reopen`, without interaction.
- Reopen comment area placeholder visible near the reopen action.

## Uploaded file tabs

The selected `Back of ID` document should show multiple uploaded files as tabs at the top of the `Document Preview` pane, directly above the document display area. This keeps file selection visually attached to the preview it controls.

File entries:

| File | Upload label | Date | Selected |
| --- | --- | --- | --- |
| `back-id-replacement-2026-06-24.pdf` | Applicant replacement | 2026-06-24 | Yes |
| `back-id-initial-2026-06-15.pdf` | Initial upload | 2026-06-15 | No |

Phase 2 should include explicit upload reason labels because they help demonstrate traceability. This does not close the open question permanently; it tests the value of labels in the static mockup.

For the Phase 2 build, explicit upload labels are confirmed and should be included in the static UI.

## Document preview region

For the selected `Back of ID` file, show a document-preview placeholder that feels like an actual evidence area:

- Preview header with selected filename and a `View full screen` button.
- Page surface with realistic text blocks or document-like placeholder zones.
- Basic metadata, such as page count or uploaded date.
- Preview unavailable state shown in another static example for `Doesn't exist` or `Not uploaded` documents.

The preview should not be decorative. It should clearly read as the place where evidence is inspected.

## Field consistency review area

For the selected `Applicant ID` group, show all six fields:

| Field | Submitted/current value | Static field state |
| --- | --- | --- |
| First name | Dana | Checkbox checked and labeled `Confirmed`. |
| Last name | Levi | Checkbox checked and labeled `Confirmed`. |
| ID number | 031245678 | Checkbox checked and labeled `Confirmed`. |
| Date of birth | 1999-04-18 | Checkbox unchecked and labeled `Confirm`. |
| Marital status | Single | Checkbox unchecked and labeled `Confirm`. |
| Number of children under 18 | 0 | Edited value control visible, checkbox checked and labeled `Confirmed`. |

Each row must show the editable value control separately from the field confirmation checkbox. The label should be compact and state-aware: `Confirmed` when checked, `Confirm` when unchecked.

## Missing items / blockers

For the selected `Applicant ID` group, do not add a separate `Blocker Details` panel. Blockers should be apparent from the workflow UI itself:

- The selected summary shows `4 blockers` alongside the document and field missing summaries.
- Document rows expose unverified document blockers through their current states: Back of ID as `Uploaded` and ID appendix as `Not uploaded`.
- Field rows expose unchecked field blockers through unchecked `Confirm` checkboxes.
- No-preview context remains attached to the relevant document or supporting static state instead of appearing in a separate blocker block.
- Required reopen comment blockers should appear next to the relevant reopen action when a reopen state is represented.

## Static-only controls

Controls should look like real controls but should not imply interactivity in Phase 2. Use disabled or visually static treatment for:

- Verify document.
- Reopen document.
- Reopen comment input.
- Field editable inputs.
- Field confirmation checkboxes.
- Group overview cards.

Phase 3 will make these controls clickable and stateful.

## Reference coverage

The UI should not include bottom reference coverage panels. Representative states that are outside the selected `Applicant ID` workflow remain captured in planning artifacts and sample data, but the rendered mockup should prioritize the primary reviewer workspace and avoid extra lower-priority panels.
