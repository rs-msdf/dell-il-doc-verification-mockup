# Stage 2 Build Checklist

Use this checklist when building and reviewing the medium-fidelity static mockup. It reflects the completed Phase 2 static UI and supporting documentation.

## Required content checklist

- [x] Phase 2 builds the actual static UI mockup.
- [x] Header shows applicant name, application reference, program, and group-count progress.
- [x] Progress uses group completion count, such as `2 of 5 groups complete`.
- [x] Group overview lists all five verification groups before entering a focused group workspace.
- [x] Group overview clearly distinguishes complete and incomplete groups.
- [x] Focused group status row shows group name, state, and missing summary.
- [x] Document review area shows expected document items for the selected group as document tabs.
- [x] Document tabs show document name and verification status; the selected document detail shows current state and applicant comment.
- [x] Uploaded-file tabs are visible inside the Document Preview pane for a document with multiple files.
- [x] Uploaded-file tabs preserve upload history and mark one selected file.
- [x] Uploaded-file tabs show only upload timestamps in the main comparison row.
- [x] Document preview region shows the selected uploaded file and a `View full screen` affordance.
- [x] Field review area shows field labels and current values.
- [x] Field values appear editable even though the mockup is static.
- [x] Field confirmation checkboxes are separate from editable value controls.
- [x] Field rows use compact checkbox labels: `Confirmed` when checked and `Confirm` when unchecked.
- [x] Blocker count is visible in the focused group status row.
- [x] Document tabs and selected document state make unverified document blockers apparent.
- [x] Field rows make unchecked field blockers apparent through field label and unchecked verification state.
- [x] Reopen controls do not rely on instructional placeholder text for required comments.
- [x] `Doesn't exist` is represented as a document state, not as a reviewer action.
- [x] The screen omits bottom reference coverage panels so the primary Applicant ID workflow remains visually focused.

## Representative state checklist

- [x] At least one complete group is shown.
- [x] At least one incomplete group is shown.
- [x] `Verified` document state is shown in the UI.
- [x] `Uploaded` document state is shown in the UI.
- [x] `Reopened` document state is covered in supporting sample data.
- [x] `Not uploaded` document state is represented by document-tab `Needs review` status and supporting sample data.
- [x] `Doesn't exist` document state is covered in supporting sample data.
- [x] Multiple uploaded files for one document item are shown.
- [x] Applicant comment is visible for document review.
- [x] Checked field state is shown.
- [x] Unchecked field state is shown.
- [x] Edited field value is visually separate from verification state.

## Visual review checklist

- [x] Styling is loosely Salesforce Lightning-inspired without strictly cloning Salesforce UI.
- [x] Document validity review and field consistency review are visually distinct.
- [x] Document review and field review are close enough to compare evidence with fields.
- [x] The selected document's applicant comment is visible and clearly labeled outside the document tabs.
- [x] The selected group is obvious.
- [x] The selected document is obvious.
- [x] Completion and incomplete states do not rely on color alone.
- [x] Badges and labels are consistent across document states.
- [x] Applicant comments do not compete visually with reviewer decision controls.
- [x] Preview unavailable states are documented in supporting state coverage.
- [x] Blockers are visible in the main workflow without a separate blocker details panel or hidden instructions.
- [x] The screen feels like an operational Salesforce-adjacent workspace, not a marketing page.
- [x] The fictional Dana Levi sample data remains the default sample content.

## Phase 2 exit review questions

- Can a reviewer tell which group is selected within three seconds?
- Can a reviewer tell why the selected group is incomplete without scanning every row?
- Can a reviewer distinguish document state from uploaded-file history?
- Can a reviewer see that field editing and field verification are separate actions?
- Can a reviewer identify where applicant comments belong for each document?
- Does the visual hierarchy support reviewing 10-20 documents without excessive context switching?
- Is the screen structure still feasible to translate into future LWC components?

## Phase 3 handoff notes

- Convert static group overview cards into selectable groups.
- Convert static document tabs and uploaded files into selectable items.
- Implement allowed reviewer document transitions only.
- Enforce required comments for reopen actions.
- Preserve field editing separately from the field confirmation checkbox state.
- Recalculate group completion when document and field states change.
- Keep blocker categories in sync with real state.
