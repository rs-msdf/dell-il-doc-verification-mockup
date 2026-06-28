# Workspace Information Architecture

The Phase 1 workspace is a single desktop reviewer screen organized around grouped verification. It minimizes context switching by keeping group progress, document review, document preview, field verification, and blockers in one coordinated layout.

## Primary regions

| Region | Placement | Role | Key content |
| --- | --- | --- | --- |
| Application header | Top of workspace | Establish candidate context and overall completion. | Applicant identity, application reference, group progress count such as `3 of 5 groups complete`. |
| Group overview/navigation | Top overview before the focused workspace; selectable navigation in later phases | Let reviewers compare the five verification groups while preserving progress awareness. | Group name, complete or incomplete status, document progress, field progress, and blocker count where useful. |
| Selected group summary | Top of main work area | Explain the selected group's purpose and current state. | Group name, expected documents, related fields summary, completion state, missing-item summary. |
| Document review area | Main center-left work area | Preserve per-document review inside the group workflow. | Expected document list or tabs, selected document item, document state, applicant comments, reviewer decision controls, reopen comment input when active. |
| Uploaded file selector | Inside selected document panel | Show all submitted files for the required document item. | Scrollable/selectable file entries or tabs, selected file marker, upload date/time, optional upload reason label in supporting data. |
| Document preview region | Main center region beside document controls | Show evidence for the selected uploaded file. | Preview for selected uploaded file; no-preview treatment for `Doesn't exist`; unavailable treatment for no upload. |
| Application field review area | Main right work area | Let reviewers compare evidence with submitted values. | Field label, submitted/current value, editable control, separate verified checkbox. |
| Blockers or missing items area | Focused status row, selected group summary, or nearby panel | Make incomplete work explicit without requiring manual scanning. | Category counts and/or details for unverified documents, unchecked fields, no-preview context, required reopen comments when relevant. |

## Low-to-medium fidelity structure

```text
+--------------------------------------------------------------------------------+
| Application Header                                                             |
| Applicant: [Name]     Application: [Reference]        Progress: 3 of 5 groups   |
+----------------------+---------------------------------------------------------+
| Group Overview: five verification groups with status and blocker counts          |
+--------------------------------------------------------------------------------+
| Selected Group Status: group state, missing docs, unchecked fields, blockers     |
+--------------------------------------------------+-----------------------------+
| Document Evidence                                | Application Field Review    |
| - Expected document tabs/list                    | - Field label               |
| - Document state                                 | - Submitted/current value   |
| - Decision controls                              | - Editable value control    |
| - Uploaded-file selector                         | - Separate verified checkbox|
| - Selected file preview                          |                             |
| - Applicant comment                              |                             |
+--------------------------------------------------+-----------------------------+
+--------------------------------------------------------------------------------+
```

## Region behavior notes

- The application header uses group completion count only. It does not show document count, field count, or a mixed percentage.
- Group overview/navigation keeps complete versus incomplete status visible before entering a focused workspace; later interactive phases can make it selectable.
- Selecting a group changes the summary, document list, preview, fields, and blocker list together.
- Selecting a document item changes the uploaded-file selector, applicant comments, document controls, and preview context.
- Selecting an uploaded file changes the preview shown for that required document item.
- `Doesn't exist` documents show no document preview; the reviewer relies on applicant comments and surrounding group context.
- Reopen comments have a defined location in the document review area, even though required validation is implemented in a later interactive phase.

## Future LWC-friendly boundaries

The Phase 1 structure can translate into future Salesforce Lightning Web Component boundaries without committing to final component names:

- Application summary/header boundary.
- Group overview/navigation boundary.
- Selected group summary and blockers boundary.
- Document item list boundary.
- Uploaded file selector boundary.
- Document preview boundary.
- Field verification list boundary.
- Document decision controls boundary.
