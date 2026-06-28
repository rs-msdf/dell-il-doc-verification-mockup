# Static Mockup Plan

## Primary static screen

The Phase 2 mockup should be one desktop reviewer workspace flow shown statically: a group overview followed by the opened `Applicant ID` workspace. Applicant ID remains the opened group because it has the richest field set and enough document variety to show the grouped workflow clearly.

The screen should be medium fidelity: realistic hierarchy, spacing, labels, statuses, and representative content, but no functional interactions.

Confirmed build direction:

- Build the actual static UI for Phase 2 now.
- Use a group overview and one opened Applicant ID workspace; omit lower-priority reference coverage panels from the UI.
- Keep the fictional Dana Levi sample data.
- Use timestamp-only uploaded-file tabs in the main comparison row, while preserving upload labels in sample data for traceability.
- Keep the style loosely Salesforce Lightning-inspired rather than a strict Salesforce clone.
- Combine document review and document preview into one evidence pane so the reviewer can keep field verification visible beside the document.

## Screen layout

```text
+------------------------------------------------------------------------------------------------+
| Group Overview                                                                                  |
| Applicant ID | Parent 1 ID | Parent 2 ID | Applicant Income | Applicant Disability Status         |
| Status, document progress, field progress, and blocker count per group                           |
+------------------------------------------------------------------------------------------------+
| All document groups / Applicant ID                                                              |
+ Incomplete | 2 documents need verification | 2 fields unchecked | 4 blockers          |
+------------------------------------------------------------------------------------------------+
| Document Evidence                                                                  | Fields       |
| Document tabs, selected document actions, uploaded-file tabs, preview surface       | Field rows   |
| and file-level View full screen action                                             | Confirm UI   |
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

## Focused group status row

For the selected `Applicant ID` group, keep the focused status compact in the breadcrumb/status row:

- Group name: Applicant ID.
- Group state: Incomplete.
- Missing summary: `2 documents need verification`, `2 fields unchecked`, `4 blockers`.

The status row should make the total missing work visible without adding a separate summary panel. Expected documents are represented by the document tabs, and related fields are represented by the field verification rail. Specific blockers should remain visible on the affected document tabs, selected document detail, and field rows.

## Document evidence pane

Document review and document preview should be unified into one primary pane. The pane should keep prominent document-level tabs, uploaded-file subtabs, the file-level preview action, and the preview surface together, with the document display receiving the majority of the pane height.

This combined pane should show only the critical document review details needed while comparing against fields: document states, the selected document's applicant comment, reviewer decision actions, selected uploaded-file tabs, the file-level preview action, and the preview itself. The pane should omit a visible `Document Evidence` heading and let the document-type tabs own the top row, left-aligned above the preview controls. Reviewer decision actions and the selected document status chip should sit in a compact verification row between the document-type tabs and uploaded-file timestamp tabs, with the CTA action buttons on the left and the status chip on the right. The selected document's applicant comment should sit in a compact footer below the preview. The `View full screen` affordance should remain compact and adjacent to the uploaded-file timestamp tabs.

The selected group document tabs should show three document items:

| Document | State | Static treatment |
| --- | --- | --- |
| ID | `Verified` | Complete badge, selected-file preview available. |
| Back of ID | `Uploaded` | Attention badge, multiple uploaded files, selected latest file. |
| ID appendix | `Not uploaded` | Missing badge, applicant comment visible, preview unavailable. |

The selected document item should be `Back of ID` so the mockup can demonstrate uploaded-file tabs in the preview pane and the selected preview.

For each document tab, show:

- Document name.
- Binary verification indicator: `Verified` when the document state is complete, otherwise `Needs review` so remaining document work is visible before opening the tab.

For the selected document detail area, show:

- Current document state as a standalone status chip on the right side of the verification row; do not repeat the selected document title from the active tab or add a `Document status` label.
- Applicant comment snippet or full comment, clearly labeled as the applicant comment, below the preview so it does not push the display down.
- Decision controls as static disabled or visual-only buttons, such as `Verify` and `Reopen`, without interaction, placed as the left-side CTA group in the verification row.

Do not show `Doesn't exist` as a reviewer action. It is a document state set by the candidate flow, not a reviewer transition.

## Uploaded file tabs

The selected `Back of ID` document should show multiple uploaded files as compact subtabs inside the `Document Evidence` pane, directly beside the preview action and above the document display area. This keeps file selection visually attached to the preview it controls while conserving vertical space.

File entries:

| File | Tab timestamp | Selected |
| --- | --- | --- |
| `back-id-replacement-2026-06-24.pdf` | 2026-06-24 14:32 | Yes |
| `back-id-initial-2026-06-15.pdf` | 2026-06-15 09:18 | No |

Phase 2 should omit explicit upload reason labels and filenames from the tab row so the document display can sit higher. Date and time are sufficient for this static comparison mockup; filenames can move to lower supporting context if they prove useful.

## Document preview region

For the selected `Back of ID` file, show a document-preview placeholder that feels like an actual evidence area:

- Compact uploaded-file tabs with timestamp only, plus an icon-only full-screen button.
- Page surface with realistic text blocks or document-like placeholder zones.
- Basic metadata, such as page count or uploaded date.
- Preview unavailable state shown in another static example for `Doesn't exist` or `Not uploaded` documents.

The preview should not be decorative. It should clearly read as the place where evidence is inspected.

## Field verification rail

Field verification should sit to the right of the combined document evidence pane so reviewers can compare submitted values against the open document without scrolling past the preview. The rail should remain compact and task-focused.

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
- Document tabs expose unverified document blockers through `Needs review` indicators, and the selected document detail exposes the current state such as `Uploaded`.
- Field rows expose unchecked field blockers through unchecked `Confirm` checkboxes.
- No-preview context remains attached to the relevant document or supporting static state instead of appearing in a separate blocker block.
- Reopen-comment validation should be handled by the UI flow when the action becomes interactive, not by instructional placeholder text in the static mockup.

## Static-only controls

Controls should look like real controls but should not imply interactivity in Phase 2. Use disabled or visually static treatment for:

- Verify document.
- Reopen document.
- Field editable inputs.
- Field confirmation checkboxes.
- Group overview cards.

Phase 3 will make these controls clickable and stateful.

## Reference coverage

The UI should not include bottom reference coverage panels. Representative states that are outside the selected `Applicant ID` workflow remain captured in planning artifacts and sample data, but the rendered mockup should prioritize the primary reviewer workspace and avoid extra lower-priority panels.
