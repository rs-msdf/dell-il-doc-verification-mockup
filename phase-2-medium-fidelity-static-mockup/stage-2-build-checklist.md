# Stage 2 Build Checklist

Use this checklist when building and reviewing the medium-fidelity static mockup.

## Required content checklist

- [ ] Phase 2 builds the actual static UI mockup.
- [ ] Header shows applicant name, application reference, program, and group-count progress.
- [ ] Progress uses group completion count, such as `2 of 5 groups complete`.
- [ ] Group overview lists all five verification groups before entering a focused group workspace.
- [ ] Group overview clearly distinguishes complete and incomplete groups.
- [ ] Selected group summary shows group name, state, expected documents, related fields, and missing summary.
- [ ] Document review area shows expected document items for the selected group.
- [ ] Document rows show document name, current state, applicant comment, and file count when relevant.
- [ ] Uploaded-file list is visible for a document with multiple files.
- [ ] Uploaded-file list preserves upload history and marks one selected file.
- [ ] Uploaded-file entries show explicit upload labels such as `Initial upload` and `Applicant replacement`.
- [ ] Document preview region shows the selected uploaded file and a `View full screen` affordance.
- [ ] No-preview treatment is represented for `Doesn't exist` or no-file conditions.
- [ ] Field review area shows field labels and current values.
- [ ] Field values appear editable even though the mockup is static.
- [ ] Verified checkboxes are separate from editable value controls.
- [ ] Unchecked fields are visibly unverified.
- [ ] Blocker count is visible in the selected group summary.
- [ ] Document rows make unverified document blockers apparent through document name and current state.
- [ ] Field rows make unchecked field blockers apparent through field label and unchecked verification state.
- [ ] Required reopen comment blockers appear next to the relevant reopen action when a reopen state is represented.
- [ ] Supporting static panels show Parent 2 ID, Applicant Income, and Applicant Disability Status state examples.

## Representative state checklist

- [ ] At least one complete group is shown.
- [ ] At least one incomplete group is shown.
- [ ] `Verified` document state is shown.
- [ ] `Uploaded` document state is shown.
- [ ] `Reopened` document state is shown.
- [ ] `Not uploaded` document state is shown.
- [ ] `Doesn't exist` document state is shown.
- [ ] Multiple uploaded files for one document item are shown.
- [ ] Applicant comment is visible for document review.
- [ ] Checked field state is shown.
- [ ] Unchecked field state is shown.
- [ ] Edited field value is visually separate from verification state.

## Visual review checklist

- [ ] Styling is loosely Salesforce Lightning-inspired without strictly cloning Salesforce UI.
- [ ] Document validity review and field consistency review are visually distinct.
- [ ] Document review and field review are close enough to compare evidence with fields.
- [ ] The selected group is obvious.
- [ ] The selected document is obvious.
- [ ] Completion and incomplete states do not rely on color alone.
- [ ] Badges and labels are consistent across document states.
- [ ] Applicant comments do not compete visually with reviewer decision controls.
- [ ] Preview unavailable states explain why no preview appears.
- [ ] Blockers are visible in the main workflow without a separate blocker details panel or hidden instructions.
- [ ] The screen feels like an operational Salesforce-adjacent workspace, not a marketing page.
- [ ] The fictional Dana Levi sample data remains the default sample content.

## Phase 2 exit review questions

- Can a reviewer tell which group is selected within three seconds?
- Can a reviewer tell why the selected group is incomplete without scanning every row?
- Can a reviewer distinguish document state from uploaded-file history?
- Can a reviewer see that field editing and field verification are separate actions?
- Can a reviewer identify where applicant comments belong for each document?
- Can a reviewer understand why a `Doesn't exist` document has no preview?
- Does the visual hierarchy support reviewing 10-20 documents without excessive context switching?
- Is the screen structure still feasible to translate into future LWC components?

## Phase 3 handoff notes

- Convert static group overview cards into selectable groups.
- Convert static document rows and uploaded files into selectable items.
- Implement allowed reviewer document transitions only.
- Enforce required comments for reopen actions.
- Preserve field editing separately from verified checkbox state.
- Recalculate group completion when document and field states change.
- Keep blocker categories in sync with real state.
