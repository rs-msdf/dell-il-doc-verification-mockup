# Static Mockup Plan

## Primary static screen

The Phase 2 mockup should be one desktop reviewer workspace screen. The default selected group should be `Applicant ID` because it has the richest field set and enough document variety to show the grouped workflow clearly.

The screen should be medium fidelity: realistic hierarchy, spacing, labels, statuses, and representative content, but no functional interactions.

Confirmed build direction:

- Build the actual static UI for Phase 2 now.
- Use one main Applicant ID workspace screen plus supporting static panels for other group states.
- Keep the fictional Dana Levi sample data.
- Use explicit uploaded-file labels for traceability.
- Keep the style loosely Salesforce Lightning-inspired rather than a strict Salesforce clone.

## Screen layout

```text
+------------------------------------------------------------------------------------------------+
| Application Header                                                                              |
| Dana Levi | Application APP-2026-0148 | Dell IL Tech Leaders | Progress: 2 of 5 groups complete |
+------------------------+-------------------------------------------------------------------------+
| Group Navigation       | Selected Group Summary                                                  |
| Applicant ID           | Applicant ID | Incomplete | 2 unverified docs | 2 unchecked fields     |
| Parent 1 ID            +--------------------------------------+----------------------------------+
| Parent 2 ID            | Document Review                      | Field Consistency Review         |
| Applicant Income       | Expected documents and selected doc  | Field rows with editable inputs  |
| Applicant Disability   | Applicant comments and controls      | Separate verified checkboxes     |
|                        +--------------------------------------+----------------------------------+
|                        | Uploaded Files                       | Document Preview                 |
|                        | Selected file plus prior submissions | Preview or no-preview treatment  |
+------------------------+--------------------------------------+----------------------------------+
| Missing Items / Blockers                                                                        |
| Unverified documents | Unchecked fields | Reopen comments and no-preview context                    |
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

## Group navigation

The left navigation should list all five groups with status markers.

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
- Missing summary: `2 documents need verification`, `2 fields unchecked`.

The summary should make blockers visible before the reviewer scans the full document and field areas.

## Document review area

The selected group document list should show three document items:

| Document | State | Static treatment |
| --- | --- | --- |
| ID | `Verified` | Complete badge, selected-file preview available. |
| Back of ID | `Uploaded` | Attention badge, multiple uploaded files, selected latest file. |
| ID appendix | `Not uploaded` | Missing badge, applicant comment visible, preview unavailable. |

The selected document item should be `Back of ID` so the mockup can demonstrate the scrollable uploaded-file list and selected preview.

For each document item, show:

- Document name.
- State badge.
- Applicant comment snippet or full comment.
- File count when uploaded files exist.
- Decision controls as static disabled or visual-only buttons, such as `Verify` and `Reopen`, without interaction.
- Reopen comment area placeholder visible near the reopen action.

## Uploaded file list

The selected `Back of ID` document should show multiple uploaded files.

File entries:

| File | Upload label | Date | Selected |
| --- | --- | --- | --- |
| `back-id-replacement-2026-06-24.pdf` | Applicant replacement | 2026-06-24 | Yes |
| `back-id-initial-2026-06-15.pdf` | Initial upload | 2026-06-15 | No |

Phase 2 should include explicit upload reason labels because they help demonstrate traceability. This does not close the open question permanently; it tests the value of labels in the static mockup.

For the Phase 2 build, explicit upload labels are confirmed and should be included in the static UI.

## Document preview region

For the selected `Back of ID` file, show a document-preview placeholder that feels like an actual evidence area:

- Preview header with selected filename.
- Page surface with realistic text blocks or document-like placeholder zones.
- Basic metadata, such as page count or uploaded date.
- Preview unavailable state shown in another static example for `Doesn't exist` or `Not uploaded` documents.

The preview should not be decorative. It should clearly read as the place where evidence is inspected.

## Field consistency review area

For the selected `Applicant ID` group, show all six fields:

| Field | Submitted/current value | Static field state |
| --- | --- | --- |
| First name | Dana | Verified checked. |
| Last name | Levi | Verified checked. |
| ID number | 031245678 | Verified checked. |
| Date of birth | 1999-04-18 | Unchecked. |
| Marital status | Single | Unchecked. |
| Number of children under 18 | 0 | Edited value control visible, verified checked. |

Each row must show the editable value control separately from the verified checkbox.

## Missing items / blockers

For the selected `Applicant ID` group, show blockers grouped by category:

Unverified documents:

- Back of ID: `Uploaded`.
- ID appendix: `Not uploaded`.

Unchecked fields:

- Date of birth.
- Marital status.

Review context:

- ID appendix has no preview because no file has been uploaded.

Required reopen comments:

- None currently pending for Applicant ID.

## Static-only controls

Controls should look like real controls but should not imply interactivity in Phase 2. Use disabled or visually static treatment for:

- Verify document.
- Reopen document.
- Reopen comment input.
- Field editable inputs.
- Field verified checkboxes.
- Group navigation rows.

Phase 3 will make these controls clickable and stateful.

## Supporting static panels

Because the main selected screen is Applicant ID, the static UI should also include compact supporting panels for representative states that live in other groups:

| Supporting panel | Purpose | Required states shown |
| --- | --- | --- |
| Parent 2 ID | Show correction and no-preview edge cases. | `Reopened`, `Doesn't exist`, applicant-comment-only context. |
| Applicant Income | Show incomplete financial review. | `Uploaded`, `Not uploaded`, unchecked income field. |
| Applicant Disability Status | Show a simple complete group. | Complete group, `Verified` document, checked field. |

These panels should be static summaries, not separate full screens. They exist to make Phase 2 state coverage visible without turning the static mockup into an interactive prototype.
