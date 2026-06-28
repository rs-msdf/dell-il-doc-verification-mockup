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
- Persistent group navigation on the left.
- Selected group summary at the top of the main workspace.
- Document review and field review side by side.
- Uploaded file list adjacent to document review.
- Document preview large enough to feel reviewable.
- Missing items visible without scrolling away from the selected group summary when possible.

## Suggested spacing and sizing

| Element | Guidance |
| --- | --- |
| Workspace max width | Use the available desktop viewport; avoid narrow centered page composition. |
| Left navigation | Approximately 240-280 px. |
| Document review column | Approximately 34-40 percent of remaining width. |
| Field review column | Approximately 30-36 percent of remaining width. |
| Preview region | Large enough to inspect a document surface, at least 360 px tall in the static mockup. |
| Border radius | 4-8 px for panels, rows, and badges. |
| Section spacing | Tight enough for operational scanning, with clear grouping between regions. |

## Status treatments

Use consistent badge treatments for document and group states.

| State | Suggested treatment | Meaning |
| --- | --- | --- |
| Complete / `Verified` | Green badge or success icon | No blocker for that item. |
| Incomplete / `Uploaded` | Blue or neutral attention badge | Review action is needed. |
| `Not uploaded` | Gray or warning badge | Evidence is missing. |
| `Reopened` | Orange warning badge | Candidate correction is needed or in progress. |
| `Doesn't exist` | Neutral badge | No preview; decision relies on comments and context. |
| Unchecked field | Neutral or warning marker | Field verification is still required. |

Do not rely on color alone. Include text labels and simple icons where useful.

## Document review treatment

- Document rows should include document name, state badge, file count, and applicant comment snippet.
- The selected document should have a clear row selection treatment.
- Decision controls should appear near the selected document details.
- Reopen comment area can be visible as a disabled/static text area placeholder.
- Applicant comments should be visually distinct from reviewer decision controls.

## Uploaded-file list treatment

- Show uploaded files as compact rows with filename, upload date, and upload reason label.
- Mark the selected file clearly.
- Use a scrollable container treatment even if the static example only shows two entries.
- Preserve upload history instead of replacing older submissions visually.

## Preview treatment

- Use a document-like preview surface with filename and metadata in the preview header.
- For uploaded files, show a light page canvas with document-like content blocks.
- For `Doesn't exist`, show an empty preview state that points the reviewer to applicant comments and group context.
- For `Not uploaded`, show preview unavailable because no file exists.
- Do not make the preview look decorative or generic; it should clearly support evidence inspection.

## Field review treatment

- Each field row should show label, current value, editable input, and a separate verified checkbox.
- Checked and unchecked states should be easy to scan.
- Edited values should not visually imply automatic verification.
- Keep field rows aligned so a reviewer can compare values quickly.

## Blocker treatment

- Use a compact summary block grouped by blocker category.
- Put the blocker area close to the selected group summary or in a persistent lower region.
- Include document names and current states for unverified documents.
- Include field labels for unchecked fields.
- Include no-preview context as review context, not always as a completion blocker.
- Include required reopen comments when a reopen action is represented.

## Accessibility and readability

- Use readable text sizes for dense operational UI.
- Ensure status labels are text-visible, not color-only.
- Keep form labels adjacent to controls.
- Maintain strong enough contrast for badges, borders, and disabled controls.
- Avoid text truncation where a missing item or state could become ambiguous.
