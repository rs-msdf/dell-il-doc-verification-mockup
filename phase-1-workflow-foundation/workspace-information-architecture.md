# Workspace Information Architecture

The Phase 1 workspace is a single desktop reviewer screen organized around grouped verification. It minimizes context switching by keeping group progress, document review, document preview, field verification, and blockers in one coordinated layout.

## Primary regions

| Region | Placement | Role | Key content |
| --- | --- | --- | --- |
| Application header | Top of workspace | Establish candidate context and overall completion. | Applicant identity, application reference, group progress count such as `3 of 5 groups complete`. |
| Group navigation | Persistent left column | Let reviewers move between the five verification groups while preserving progress awareness. | Group name, complete or incomplete status, optional blocker count in later phases. |
| Selected group summary | Top of main work area | Explain the selected group's purpose and current state. | Group name, expected documents, related fields summary, completion state, missing-item summary. |
| Document review area | Main center-left work area | Preserve per-document review inside the group workflow. | Expected document list, selected document item, document state, applicant comments, reviewer decision controls, reopen comment area placeholder. |
| Uploaded file list | Inside selected document panel | Show all submitted files for the required document item. | Scrollable/selectable file entries, selected file marker, upload order/date, optional upload reason label in later phases. |
| Document preview region | Main center region beside document controls | Show evidence for the selected uploaded file. | Preview for selected uploaded file; no-preview treatment for `Doesn't exist`; unavailable treatment for no upload. |
| Application field review area | Main right work area | Let reviewers compare evidence with submitted values. | Field label, submitted/current value, editable control, separate verified checkbox. |
| Blockers or missing items area | Below selected group summary or right-side summary panel | Make incomplete work explicit without requiring manual scanning. | Unverified documents, unchecked fields, no-preview context, required reopen comments when relevant. |

## Low-to-medium fidelity structure

```text
+--------------------------------------------------------------------------------+
| Application Header                                                             |
| Applicant: [Name]     Application: [Reference]        Progress: 3 of 5 groups   |
+----------------------+---------------------------------------------------------+
| Group Navigation     | Selected Group Summary                                  |
| - Applicant ID       | Group state, expected docs, missing completion items    |
| - Parent 1 ID        +--------------------------+------------------------------+
| - Parent 2 ID        | Document Review          | Application Field Review     |
| - Applicant Income   | - Expected documents     | - Field label                |
| - Disability Status  | - Document state         | - Submitted/current value    |
|                      | - Applicant comments     | - Editable value control     |
|                      | - Decision controls      | - Separate verified checkbox |
|                      | - Reopen comment area    |                              |
|                      +--------------------------+------------------------------+
|                      | Uploaded File List       | Document Preview             |
|                      | - File 1                 | - Selected file preview      |
|                      | - File 2                 | - No-preview state when      |
|                      | - Selected file marker   |   document does not exist    |
+----------------------+--------------------------+------------------------------+
| Blockers / Missing Items: unverified docs, unchecked fields, reopen comments    |
+--------------------------------------------------------------------------------+
```

## Region behavior notes

- The application header uses group completion count only. It does not show document count, field count, or a mixed percentage.
- Group navigation remains visible while reviewing documents and fields.
- Selecting a group changes the summary, document list, preview, fields, and blocker list together.
- Selecting a document item changes the uploaded-file list, applicant comments, document controls, and preview context.
- Selecting an uploaded file changes the preview shown for that required document item.
- `Doesn't exist` documents show no document preview; the reviewer relies on applicant comments and surrounding group context.
- Reopen comments have a defined location in the document review area, even though required validation is implemented in a later interactive phase.

## Future LWC-friendly boundaries

The Phase 1 structure can translate into future Salesforce Lightning Web Component boundaries without committing to final component names:

- Application summary/header boundary.
- Group navigation boundary.
- Selected group summary and blockers boundary.
- Document item list boundary.
- Uploaded file selector boundary.
- Document preview boundary.
- Field verification list boundary.
- Document decision controls boundary.
