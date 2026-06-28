# Verification Group Inventory

This inventory represents the five required verification groups exactly as defined for Phase 1. Each group combines expected documents with the application fields those documents help verify.

## Required groups

| Group | Expected documents | Related application fields |
| --- | --- | --- |
| Applicant ID | ID; back of ID; ID appendix | First name; last name; ID number; date of birth; marital status; number of children under 18 |
| Parent 1 ID | ID; back of ID; ID appendix | Number of siblings under 24 years of age |
| Parent 2 ID | ID; back of ID; ID appendix | Number of siblings under 24 years of age |
| Applicant Income | Income statement; benefits statement | Applicant income |
| Applicant Disability Status | Disability certificate | Applicant disability percentage |

Parent 1 ID and Parent 2 ID intentionally use the same field label: `Number of siblings under 24 years of age`.

## Document item model

A required document item represents a document type inside a group. It is not the same as a single uploaded file.

Each required document item has:

- Document name.
- Current document state: `Not uploaded`, `Uploaded`, `Doesn't exist`, `Reopened`, or `Verified`.
- Zero or more uploaded file entries.
- One selected uploaded file when uploaded files exist.
- Applicant comment content when provided.
- Preview availability based on the selected uploaded file and document state.
- Reviewer decision controls based on current state.
- Reopen comment input when the reviewer chooses to reopen a document.

Uploaded file entries are reviewable submissions under the document item. When an applicant corrects a `Reopened` document, the replacement appears in the same uploaded-file list for that required document item, and the document becomes review-ready again only after the replacement upload exists.

## Field item model

Each application field in a group has:

- Field label.
- Current submitted application value.
- Editable value control for reviewer correction.
- Separate verified checkbox.
- Explicit unverified state until the checkbox is checked.

Editing a value and verifying a value are separate actions. A field can have an edited value and still remain incomplete until the reviewer checks it as verified.

## Document review placement rules

For each expected document, the workspace must show where reviewers find:

| Required information | Workspace location |
| --- | --- |
| Document name | Document review area document list, tab, or selected document panel. |
| Current document state | Document tab/status indicator and selected document details. |
| Uploaded file list | Scrollable uploaded-file selector or tabs inside the selected document panel. |
| Selected uploaded file | Highlighted file entry in uploaded-file selector and preview context. |
| Applicant comment content | Selected document details, near document state and decision controls. |
| Document preview | Document preview region beside document controls. |
| No-preview treatment for `Doesn't exist` | Document preview region, with context pointing to applicant comments. |
| Reviewer decision controls | Selected document details. |
| Required reopen comment input | Selected document details, when the reopen action is active. |

## Field review placement rules

For each field, the workspace must show where reviewers find:

| Required information | Workspace location |
| --- | --- |
| Field label | Application field review area. |
| Current submitted value | Application field review area beside editable control. |
| Editable value control | Application field review area. |
| Verified checkbox | Application field review area, separate from the editable control. |
| Unverified state | Application field review row and blocker list when unchecked. |
