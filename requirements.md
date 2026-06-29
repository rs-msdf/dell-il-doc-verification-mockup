## Requirements: Dell IL Tech Leaders Verification UI (Draft v1)

### 1. Scope and actor
- Primary user is the verification reviewer.
- This spec covers an interactive UI mockup for scholarship document verification.
- Typical application volume is 10-20 documents.
- The mockup is desktop-only; mobile and responsive mobile layouts are not required.
- Production platform context: the system runs in Salesforce and the eventual UI will be built with Lightning Web Components (LWC).
- Mockup implementation stack is flexible, but design and interaction choices should keep Salesforce Lightning/LWC capabilities and constraints in mind.
- Technology decisions are tracked separately in `technology-decisions.md`.

### 2. Core verification responsibilities
- Document-level verification:
  - Confirm it is the correct required document.
  - Confirm document readability.
  - Confirm it pertains to the relevant person.
- Application consistency verification:
  - Confirm document evidence matches submitted application values.

### 3. Document state model
- A required document item represents a document type, such as `back of ID`.
- A single required document item can have multiple uploaded files over time.
- Uploaded files may come from the applicant proactively replacing a file or from a requested correction after reopening.
- Allowed document item states: Not uploaded, Uploaded, Doesn't exist, Reopened, Verified.
- Initial state is Not uploaded.
- Applicant transitions:
  - Not uploaded -> Uploaded.
  - Not uploaded -> Doesn't exist.
  - Reopened -> Uploaded, after the applicant uploads a replacement file.
- Reviewer transitions:
  - Not uploaded -> Verified (comment required).
  - Uploaded -> Verified.
  - Verified -> Uploaded, Not uploaded, or Doesn't exist through Unverify, depending on uploaded files and the prior missing-document state.
  - Uploaded -> Reopened (comment required).
  - Verified -> Reopened (comment required).
  - Doesn't exist -> Verified (comment required).
  - Doesn't exist -> Reopened (comment required).

### 4. Reopen behavior
- Reopen requires a mandatory reviewer comment.
- Reopen triggers an email notification to the candidate requesting correction.

### 5. Content visibility
- Reviewer must see applicant comment content for each document.
- When a document item has uploaded files, the reviewer must be able to scroll through and select from the list of uploaded files for that document type.
- The selected uploaded file determines the document preview shown for that document item.
- The uploaded file list should preserve visibility of multiple submissions, including applicant-initiated replacements and correction-request replacements.
- For Doesn't exist documents, no document preview is displayed.
- For Doesn't exist documents, reviewer decision is based on applicant comments and surrounding application/group context.

### 6. Grouped field verification
- The UI must support grouped review where multiple documents support a field set.
- Group review must present the relevant documents and fields together in one workflow.
- Group review must make the expected supporting documents visible for each field set.

Group 1: Applicant ID
- Documents: ID, back of ID, ID appendix.
- Fields: first name, last name, ID number, date of birth, marital status, number of children under 18.

Group 2: Parent 1 ID
- Documents: ID, back of ID, ID appendix.
- Fields: number of siblings under 24 years of age.

Group 3: Parent 2 ID
- Documents: ID, back of ID, ID appendix.
- Fields: number of siblings under 24 years of age.

Parent 1 ID and Parent 2 ID intentionally use the same field wording.

Group 4: Applicant Income
- Documents: income statement, benefits statement.
- Fields: applicant income.

Group 5: Applicant Disability Status
- Documents: disability certificate.
- Fields: applicant disability percentage.

### 7. Per-field verification interaction
- For each field, show current application value.
- Reviewer can edit field value when evidence is inconsistent.
- Each field includes a verified checkbox.
- Editing and marking verified are separate actions.
- A field remains unverified until explicitly checked.

### 8. Group completion logic
- A group is complete only when both are true:
  - All group documents are in Verified state.
  - All group field checkboxes are checked.

### 9. Progress and missing-items visibility
- Group list must clearly show complete versus incomplete groups at a glance.
- Top-level progress should be shown by group completion count, such as 3 of 5 groups complete.
- When a group is selected, missing items for completion must be explicit:
  - Documents not yet Verified.
  - Fields not yet checked as verified.
- Missing items should be visible by category, using compact counts, inline indicators, or detailed lists as appropriate for the phase. Categories include unverified documents, unchecked fields, and required reopen comments when relevant.

### 9.1 Layout assumption for mockup planning
- The mockup is desktop-focused.
- Mobile layout support is not required.
- Document preview and field review should be planned as side-by-side workspace regions.

### 10. UX and validation constraints
- Document states and available actions must be unambiguous.
- Group workflow must coexist with per-document state handling.
- Per-document state handling must coexist with multiple uploaded files for a single document type.
- Incomplete groups must surface actionable blockers.
- Reviewers should be able to complete work progressively across fields and documents.

### 11. Out of scope for this phase
- Backend architecture and data model implementation details.
- OCR or ML extraction implementation.
- Production notification infrastructure implementation.

### 12. Phase 2 clarification
- Phase 2 uses timestamp-only uploaded-file tabs in the main comparison row to keep the preview area compact.
- Supporting sample data can still preserve upload labels such as `Initial upload`, `Applicant replacement`, and `requested correction` for traceability and later interactive phases.
