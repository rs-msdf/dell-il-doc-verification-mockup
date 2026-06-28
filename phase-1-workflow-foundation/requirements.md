# Phase 1 Requirements: Workflow Foundation and Information Architecture

## 1. Purpose

Phase 1 defines the reviewer-facing workflow foundation for the Dell IL Tech Leaders document verification mockup. The goal is to make the verification structure clear before building detailed screens or interactive behavior.

This phase should answer where reviewers go, what they see, how documents and fields are grouped, and how they understand whether a group is complete or blocked.

## 2. Source Inputs

Phase 1 is based on:

- `mission.md`
- `requirements.md`
- `roadmap.md`, Stage 1: Workflow Foundation and Information Architecture
- `technology-decisions.md`

## 3. Planning Decisions

The following decisions are settled for Phase 1 planning:

- Parent 1 ID and Parent 2 ID intentionally use the same field wording: `number of siblings under 24 years of age`.
- A `Reopened` document becomes review-ready again when the applicant uploads a replacement file.
- A required document item can contain multiple uploaded files for the same document type; reviewers need a scrollable/selectable uploaded-file list while reviewing that document item.
- Top-level progress should be shown by group completion only, such as `3 of 5 groups complete`.
- The mockup is desktop-focused; document preview and field review should be planned as side-by-side regions.
- Blockers should be grouped by category, including unverified documents, unchecked fields, and required reopen comments when relevant.

## 4. Primary User

The primary user is a verification reviewer processing scholarship applications with approximately 10-20 applicant documents.

The reviewer needs to:

- Confirm each document is correct, readable, and tied to the relevant person.
- Compare document evidence against application-submitted values.
- Make verification decisions that are explicit and traceable.
- Understand what is incomplete without searching across unrelated screens.

## 5. Phase 1 Scope

Phase 1 includes planning and structure definition only. It should produce low-to-medium fidelity workflow artifacts, not a functional prototype.

In scope:

- Reviewer journey from application selection to final group completion.
- Main workspace information architecture.
- Verification group structure.
- Document-to-field mapping for all required groups.
- Initial group completion logic.
- Required blocker visibility for incomplete groups.
- Placement of applicant comments, document preview, document state controls, editable field values, verified checkboxes, and progress indicators.

Out of scope:

- High-fidelity visual design.
- Clickable interactions.
- React/Vite implementation.
- Backend architecture or production Salesforce data model design.
- OCR, ML extraction, or automated document reading.
- Production email notification implementation.

## 6. Reviewer Journey Requirements

The Phase 1 journey map must cover these steps:

1. Reviewer opens an application assigned for verification.
2. Reviewer sees the application-level verification progress.
3. Reviewer selects one of the five verification groups.
4. Reviewer reviews expected documents for the selected group.
5. Reviewer checks applicant comments and document previews where applicable.
6. Reviewer compares document evidence to related application fields.
7. Reviewer identifies incomplete document decisions and unchecked field verifications.
8. Reviewer understands whether the selected group is complete, incomplete, or blocked.
9. Reviewer moves to another group while preserving awareness of overall progress.
10. Reviewer reaches an application-level completion state only when every group is complete.

The journey map should show the reviewer objective, visible information, key decision, and possible blocker at each step.

## 7. Information Architecture Requirements

The main workspace must be organized around grouped verification. Phase 1 must define the placement and role of these regions:

- Application header: applicant identity, application reference, and group-based overall progress.
- Group navigation: five verification groups with completion status.
- Selected group summary: group purpose, current state, and missing completion items.
- Document review area: expected documents, document state, applicant comments, preview availability, and document-level actions.
- Uploaded file list: scrollable/selectable list of files submitted for the selected document type.
- Application field review area: current field values, editable field controls, and separate verified checkboxes.
- Blockers or missing items area: explicit list of documents and fields preventing group completion.

The structure must minimize context switching between document validity checks and application consistency checks.

## 8. Required Verification Groups

Phase 1 must represent these five groups exactly:

| Group | Documents | Fields |
| --- | --- | --- |
| Applicant ID | ID; back of ID; ID appendix | First name; last name; ID number; date of birth; marital status; number of children under 18 |
| Parent 1 ID | ID; back of ID; ID appendix | Number of siblings under 24 years of age |
| Parent 2 ID | ID; back of ID; ID appendix | Number of siblings under 24 years of age |
| Applicant Income | Income statement; benefits statement | Applicant income |
| Applicant Disability Status | Disability certificate | Applicant disability percentage |

Parent 1 ID and Parent 2 ID intentionally use the same field label.

## 9. Document Review Requirements

For each expected document, the Phase 1 structure must show where the reviewer can find:

- Document name.
- Current document state.
- Uploaded file list, when one or more files exist for that document type.
- Selected uploaded file.
- Applicant comment content, when provided.
- Document preview for the selected uploaded file, when a file exists.
- No-preview treatment for `Doesn't exist` documents.
- Available reviewer decision controls.
- Any required reviewer comment area for reopening, even if comment validation is implemented in a later phase.

When an applicant corrects a `Reopened` document, the Phase 1 model should assume the document returns to review-ready status only after the applicant uploads a replacement file. That replacement file appears in the uploaded file list for the same required document item.

The structure must preserve per-document state handling within a grouped workflow.

## 10. Application Field Review Requirements

For each field in the selected group, the Phase 1 structure must show where the reviewer can find:

- Field label.
- Current submitted application value.
- Editable value control.
- Separate verified checkbox.
- Unverified state when the checkbox has not been explicitly checked.

Editing a field and verifying a field must be represented as separate reviewer actions.

## 11. State and Completion Model Requirements

Phase 1 must document the initial completion logic used by the mockup:

- A document is complete only when its state is `Verified`.
- A field is complete only when its verified checkbox is checked.
- A group is complete only when all documents in that group are `Verified` and all fields in that group are checked as verified.
- An application is complete only when all five groups are complete.
- Top-level progress is represented by group completion count, not by document count, field count, or a combined percentage.

Phase 1 should identify, but does not need to fully implement, the following document states:

- `Not uploaded`
- `Uploaded`
- `Doesn't exist`
- `Reopened`
- `Verified`

These states apply to the required document item, not to each uploaded file entry. Uploaded file entries are reviewable submissions under the document item.

Phase 1 must clarify how incomplete groups expose blockers:

- Documents not in `Verified` state.
- Fields not checked as verified.
- Reopen comments required for reopen decisions, when relevant in later phases.

## 12. Blocker Visibility Requirements

The selected group view must make missing completion items explicit. A reviewer should not need to infer completion blockers by manually scanning the entire group.

Blockers should be grouped by category.

For each incomplete group, Phase 1 must define a blocker display that can list:

- Unverified documents by document name and current state.
- Unchecked fields by field label.
- Any no-preview or applicant-comment-only document condition that affects review context.
- Required reopen comments, when reopen behavior is represented in later phases.

The group navigation must also show complete versus incomplete status at a glance.

## 13. Low-to-Medium Fidelity Screen Structure Requirements

Phase 1 must produce a screen structure that includes:

- One primary reviewer workspace screen.
- Persistent group navigation.
- Selected group details.
- Document list or document panel.
- Scrollable uploaded-file list for the selected document type.
- Document preview region.
- Applicant comment visibility.
- Field verification region.
- Progress and completion indicators.
- Missing-items or blockers region.

The Phase 1 layout is desktop-only. Document preview and application field review should be planned as side-by-side regions.

The screen structure should be compatible with future Salesforce Lightning Web Component boundaries, but it does not need to define final component names.

## 14. Deliverables

Phase 1 should produce:

- Reviewer journey map.
- Low-to-medium fidelity main workspace structure.
- Group and document inventory mapped to fields.
- Initial completion logic model.
- Blocker visibility model for incomplete groups.
- Decision log and remaining open questions list for later phases.

## 15. Remaining Open Questions

- Do uploaded file entries need explicit labels for `initial upload`, `applicant replacement`, and `requested correction`, or is upload date/order enough for Phase 1?
- Should required reopen comments appear in the Phase 1 blocker model, or only begin in the clickable prototype phase?
- Should group navigation show only complete/incomplete state, or also a count of blockers within each group?

## 16. Exit Criteria

Phase 1 is complete when all of the following are true:

- The reviewer journey from application selection through final group completion is documented.
- The main workspace layout identifies where group navigation, document review, field review, progress, and blockers appear.
- All five required verification groups are represented.
- Each required group maps expected documents to related application fields.
- Applicant comments, uploaded file lists, document previews, document state controls, editable field values, and verified checkboxes each have a defined location in the workspace structure.
- The group completion model is documented and matches the draft requirements.
- Incomplete group blocker visibility is documented by category for unverified documents, unchecked fields, and required reopen comments when relevant.
- The planned structure supports grouped review while preserving per-document state handling.
- The Phase 1 artifacts are detailed enough to support Stage 2 static mockup work without re-deciding the basic workflow structure.
