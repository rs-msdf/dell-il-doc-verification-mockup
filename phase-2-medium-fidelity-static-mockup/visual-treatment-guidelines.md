# Visual Treatment Guidelines

Phase 2 should look like a credible reviewer workspace while remaining medium fidelity. The visual language should be compatible with future Salesforce Lightning Web Components without requiring a heavy component framework.

## Overall style

- Desktop-focused operational tool, not a landing page.
- Dense but readable layout for 10-20 document applications.
- Quiet visual hierarchy with clear status signals.
- Full workspace layout rather than decorative cards inside cards.
- Use borders, spacing, section headers, badges, and form controls to separate tasks.
- Avoid large hero treatments, marketing copy, decorative gradients, and oversized illustration.

## Layout principles

- Fixed application header at the top of the screen area.
- Group-first overview before the reviewer enters an individual group.
- No persistent group navigation pane inside the focused group workspace; use a compact breadcrumb/back affordance instead.
- Compact focused group status row at the top of the focused group workspace.
- Combined document evidence pane on the left, with field verification in a right-side rail.
- Document-type tabs should be prominent, left-aligned, and should replace the visible evidence-pane heading.
- Uploaded-file tabs inside the document evidence pane, showing only upload date and time directly above the document display area.
- Document preview large enough to feel reviewable and visually prioritized over secondary controls.
- Decision controls should sit on the left and document status on the right between the document-type tabs and uploaded-file timestamp tabs; applicant comments can sit below the preview.
- Missing items visible in the focused status row when possible.

## Suggested spacing and sizing

| Element | Guidance |
| --- | --- |
| Workspace max width | Use the available desktop viewport; avoid narrow centered page composition. |
| Group overview cards | Five visible cards across the desktop workspace where possible. |
| Document evidence pane | Majority of the remaining width, large enough to keep prominent document tabs, compact verification controls, file timestamp tabs, applicant comment footer, and preview together. |
| Field review rail | Approximately 30-36 percent of remaining width. |
| Preview region | Large enough to inspect a document surface, at least 560 px tall on desktop when paired with the field review rail. |
| Border radius | 4-8 px for panels, rows, and badges. |
| Section spacing | Tight enough for operational scanning, with clear grouping between regions. |

## Status treatments

Use consistent badge treatments for document and group states.

All needs-attention text treatments should use the same attention color and typography across incomplete status chips, document-tab `Needs review` labels, unchecked field labels, and selected-group summary chips.

| State | Suggested treatment | Meaning |
| --- | --- | --- |
| Complete / `Verified` | Green badge or success icon | No blocker for that item. |
| Incomplete / `Uploaded` | Blue or neutral attention badge | Review action is needed. |
| `Not uploaded` / `Doesn't exist` | Matching warning badge | Evidence is missing or accepted as absent. |
| `Reopened` | Orange warning badge | Candidate correction is needed or in progress. |
| Unchecked field | Neutral or warning marker | Field verification is still required. |

Do not rely on color alone. Include text labels and simple icons where useful.

## Document review treatment

- Document tabs should include the document name and a verification indicator such as `Verified` or `Needs review`.
- The selected document should have a clear tab selection treatment and a detailed state badge in the verification row.
- Decision controls should appear as the CTA group in the verification row above the preview.
- Do not show `Doesn't exist` as a reviewer action; represent it only as a document state.
- Applicant comments should be visually distinct from reviewer decision controls.

## Uploaded-file tab treatment

- Show uploaded files as compact tabs with upload date and time only in the main comparison row.
- Keep uploaded-file tabs visually subordinate to document tabs through lighter typography, slightly smaller sizing, and a softer selected accent.
- Mark the selected file clearly and align it with the preview surface below.
- Use horizontal overflow treatment so the pattern can scale beyond the two static entries.
- Preserve upload history instead of replacing older submissions visually.

## Preview treatment

- Use a document-like preview surface without repeating filename metadata above the display.
- Place uploaded-file tabs directly above the document surface so it is clear which file controls the visible preview.
- For uploaded files, show a light page canvas with document-like content blocks.
- Include a compact icon-only `View full screen` action beside the uploaded-file timestamp tabs so reviewers can identify the larger-inspection path.
- For `Doesn't exist`, show an empty preview state that points the reviewer to applicant comments and group context.
- For `Not uploaded`, show preview unavailable because no file exists.
- Do not make the preview look decorative or generic; it should clearly support evidence inspection.

## Field review treatment

- Each field row should show label, current value, editable input, and a compact confirmation checkbox labeled `Confirmed` when checked or `Confirm` when unchecked.
- Checked and unchecked states should be easy to scan without making unchecked rows read as already confirmed.
- Edited values should not visually imply automatic verification.
- Keep field rows aligned so a reviewer can compare values quickly.

## Blocker treatment

- Do not add a standalone blocker details panel in the Phase 2 static UI.
- Use the focused group status row for compact blocker counts and missing-work totals.
- Make unverified document blockers apparent through document tab indicators and the selected document's current-state badge.
- Make unchecked field blockers apparent through field labels and unchecked verification controls in field rows.
- Include no-preview context as document review context, not always as a completion blocker.
- Do not add instructional reopen-comment placeholder text; validation should be handled by the UI flow when the action becomes interactive.

## Accessibility and readability

- Use readable text sizes for dense operational UI.
- Ensure status labels are text-visible, not color-only.
- Keep form labels adjacent to controls.
- Maintain strong enough contrast for badges, borders, and disabled controls.
- Avoid text truncation where a missing item or state could become ambiguous.
