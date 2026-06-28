# Phase 2 Requirements: Medium-Fidelity Static Mockup

## 1. Purpose

Phase 2 defines and implements a static but realistic reviewer workspace. The goal is to demonstrate the core verification experience and visual hierarchy before adding clickable state changes in Phase 3.

This phase should answer what the main workspace screen looks like, what representative content appears in it, how document review differs from field consistency review, and how incomplete work is made obvious.

## 2. Phase 1 readiness

Phase 1 is considered complete for Phase 2 entry because the following artifacts exist:

- Reviewer journey map.
- Desktop workspace information architecture.
- Required verification group inventory.
- Initial completion logic model.
- Blocker visibility model.
- Decision log and open questions.

Phase 2 should not re-decide the basic workflow foundation unless a static mockup review exposes a clear issue.

## 3. In scope

- One medium-fidelity static mockup of the main reviewer workspace.
- Build the actual static UI mockup for Phase 2.
- Representative applicant data and document states across all five groups.
- Static display of group progress by completion count.
- Static display of complete and incomplete group statuses.
- Selected group view with expected supporting documents as document tabs, document-state visibility, selected applicant comment, uploaded-file tabs in the preview pane, preview area, field values, editable inputs, compact field confirmation checkboxes, and missing completion items.
- Static visual treatment for progress, blockers, comments, and decision states.
- Salesforce Lightning Design System-inspired layout, spacing, typography, badges, buttons, forms, and panels.
- Desktop-only layout.

## 4. Out of scope

- Clickable group selection or document selection.
- Interactive document state transitions.
- Functional field editing.
- Functional checkbox state changes.
- Reopen comment validation.
- Candidate email notification simulation.
- Backend, OCR, ML, or Salesforce data model implementation.
- Mobile or responsive mobile layouts.

## 5. Required static screen content

The main static screen must include:

- Application header with applicant identity, application reference, and group progress such as `2 of 5 groups complete`.
- Group-first navigation with all five required groups visible before entering a focused group workspace.
- Complete versus incomplete status for each group.
- Focused group status row with current state and missing completion items.
- Document review area showing expected document items for the selected group as document tabs.
- Verification indicator for each selected-group document tab, plus the selected document's detailed state chip.
- Applicant comment visible for the selected document item, with all document comments retained in sample data.
- Selectable uploaded-file tabs in the preview pane for a selected document item with multiple files.
- Selected uploaded file marker.
- Document preview region for the selected uploaded file, including a static `View full screen` affordance.
- Application field review area with submitted values, editable controls, and compact field confirmation checkboxes that read `Confirmed` when checked and `Confirm` when unchecked.
- Inline blocker visibility through the focused group status row, group and document states, unchecked fields, and reopen comments when relevant.
The main screen should stay focused on the active reviewer workflow. Lower-priority reference coverage examples should remain in planning artifacts or sample data rather than appearing as bottom-of-page UI panels.

## 6. Required representative states

The static mockup plan must include examples of:

- Complete group.
- Incomplete group.
- `Verified` document.
- `Uploaded` document needing reviewer decision.
- `Reopened` document awaiting candidate correction or replacement.
- `Not uploaded` document.
- `Doesn't exist` document with no preview and applicant-comment context.
- Document item with multiple uploaded files.
- Uploaded-file entries with timestamp-only labels in the main UI and explicit labels such as `Initial upload` and `Applicant replacement` in supporting sample data.
- Checked field.
- Unchecked field.
- Edited field value that is still separately verified or unverified.

## 7. Confirmed design decisions

- The Phase 2 deliverable is an actual static UI build, not documentation only.
- The main screen should show the group overview first, with Applicant ID represented as the opened focused group workspace.
- The UI should omit lower-priority supporting static panels for states that live outside the selected Applicant ID group because they added visual clutter.
- Mockup review exposed visual clutter from persistent group navigation, so Phase 2 now uses a group-first navigation model with no document group pane inside the focused group workspace.
- Mockup review exposed that bottom-positioned field verification made side-by-side comparison difficult, so Phase 2 now combines document review and document preview into one evidence pane and places field verification in a right-side rail.
- Mockup review exposed that the focused group summary panel duplicated visible document and field context, so Phase 2 now keeps missing-work counts in the compact status row.
- `Doesn't exist` is a candidate-side document state, not a reviewer transition action.
- Uploaded file tabs should stay timestamp-only in the main comparison row; filenames can move to lower supporting context if they prove necessary.
- The styling should be loosely Salesforce Lightning-inspired while remaining a custom mockup.
- The fictional Dana Levi sample applicant data should remain the default sample content.

## 8. Exit criteria

Phase 2 is complete when:

- The static main workspace screen is specified in enough detail to build without re-deciding layout.
- Representative data covers all five groups and the major document states.
- The selected group view clearly defines document review, preview, field review, and blockers.
- The visual treatment is compatible with future Lightning/LWC implementation.
- The mockup review checklist can be used to evaluate whether a reviewer can distinguish document review tasks from field consistency tasks.
- The mockup review checklist can verify that unverified documents and unchecked fields are obvious without hidden instructions.
