# Roadmap: Dell IL Tech Leaders Document Verification UI Mockup

This roadmap translates the mission and draft requirements into a phased UI mockup approach. The work should move from workflow clarity to a fully interactive reviewer experience, while keeping Salesforce Lightning Web Components (LWC) constraints in mind for future production implementation.

Technology decisions are tracked separately in `technology-decisions.md`.

## Stage 1: Workflow Foundation and Information Architecture

### Goal
Define the reviewer-facing structure for processing 10-20 applicant documents with minimal context switching between document validity checks and application consistency checks.

### Key activities
- Map the reviewer journey from application selection through final group completion.
- Define the main workspace layout, including group navigation, document review area, application field review area, and progress/status visibility.
- Plan the desktop workspace with document preview and field review side by side.
- Represent the five required verification groups:
  - Applicant ID.
  - Parent 1 ID.
  - Parent 2 ID.
  - Applicant Income.
  - Applicant Disability Status.
- Identify where applicant comments, document previews, document state controls, editable field values, and verified checkboxes appear.
- Define how reviewers scroll through and select among multiple uploaded files for a single required document type.
- Clarify how incomplete groups expose blockers, including unverified documents and unchecked fields.
- Group blockers by category, including unverified documents, unchecked fields, and required reopen comments when relevant.

### Deliverables
- Low-to-medium fidelity screen structure.
- Reviewer journey map.
- Group and document inventory mapped to fields.
- Initial completion logic model for groups.

### Exit criteria
- Reviewers can understand where to find each document, each related application field, and group-based completion status.
- The mockup structure supports grouped review without losing per-document state handling.

## Stage 2: Medium-Fidelity Static Mockup

### Goal
Create a static but realistic reviewer workspace that demonstrates the core verification experience and visual hierarchy.

### Key activities
- Build a medium-fidelity UI mockup using representative applicant data and sample document states.
- Show a clear group list with complete versus incomplete status at a glance.
- For the selected group, display:
  - Expected supporting documents.
  - Current document states.
  - Uploaded-file tabs when multiple files exist for one document type.
  - Applicant comments per document.
  - Document preview for the selected uploaded file when a file exists.
  - No preview for `Doesn't exist` documents.
  - Current application field values.
  - Editable field inputs.
  - Separate verified checkboxes per field.
- Surface missing completion items directly in the selected group view.
- Use visual patterns compatible with a future Salesforce Lightning/LWC implementation.

### Deliverables
- Static mockup of the main verification workspace.
- Representative examples of complete, incomplete, reopened, uploaded, verified, not uploaded, and doesn't-exist states.
- Visual treatment for progress, blockers, comments, and decision states.
- Current Phase 2 status: completed as a Vite + React + TypeScript static UI with supporting documentation.

### Exit criteria
- A reviewer can visually distinguish document review tasks from field consistency tasks.
- The mockup makes unverified documents and unchecked fields obvious without requiring hidden instructions.

## Stage 3: Clickable Workflow Prototype

### Goal
Turn the static mockup into a clickable prototype that validates navigation, review sequencing, and progressive completion across groups.

### Key activities
- Add group selection and document selection interactions.
- Allow reviewers to move between the five verification groups while preserving visible progress.
- Add prototype controls for document state transitions:
  - `Uploaded` to `Verified`.
  - `Uploaded` to `Reopened` with required comment.
  - `Verified` to `Reopened` with required comment.
  - `Doesn't exist` to `Verified`.
  - `Doesn't exist` to `Reopened` with required comment.
- Prevent invalid or unsupported state transitions from appearing as available actions.
- Add editable application fields while keeping field verification as a separate checkbox action.
- Update group completion indicators when all documents are verified and all fields are checked.

### Deliverables
- Clickable prototype with realistic navigation and stateful UI behavior.
- Simulated applicant data across all groups.
- Prototype validation notes for confusing states, unclear actions, or missing blockers.

### Exit criteria
- Reviewers can complete a group progressively by verifying documents and checking fields.
- Reopen flows visibly require comments before completion.
- Group completion responds correctly to document and field changes.

## Stage 4: High-Fidelity Reviewer Experience

### Goal
Refine the prototype into a polished, high-fidelity experience that feels production-adjacent while remaining focused on mockup validation.

### Key activities
- Apply a Lightning-compatible visual language for layout, controls, status badges, forms, comments, and document panels.
- Refine density and scanning behavior for 10-20 document applications.
- Improve reviewer confidence with explicit decision-state visibility and traceable comments.
- Add realistic empty, blocked, and edge states:
  - Not uploaded document.
  - Doesn't-exist document with applicant comment only.
  - Reopened document awaiting candidate correction.
  - Uploaded document needing reviewer action.
  - Verified document available for reopening.
- Add validation messaging for required reopen comments and incomplete groups.
- Review wording for fairness, clarity, and reviewer accountability.

### Deliverables
- High-fidelity mockup screens for normal, incomplete, complete, and reopened workflows.
- Refined component inventory aligned with likely LWC implementation boundaries.
- UX review checklist for throughput, clarity, and traceability.

### Exit criteria
- The experience supports fast scanning without hiding required decisions.
- Reviewers can justify why each group is complete or blocked.
- The interface remains feasible to translate into Salesforce LWC components later.

## Stage 5: Fully Interactive Functional Mockup

### Goal
Deliver an interactive mockup with full front-end functionality for the defined mission phase, covering document verification, field consistency checks, group completion, and reopen behavior.

### Key activities
- Implement stateful front-end behavior for all document states:
  - `Not uploaded`.
  - `Uploaded`.
  - `Doesn't exist`.
  - `Reopened`.
  - `Verified`.
- Enforce allowed applicant and reviewer transitions in the mockup data model.
- Require reviewer comments for every reopen action.
- Simulate the candidate email notification trigger when a document is reopened.
- Support document preview visibility rules, including no preview for `Doesn't exist` documents.
- Support multiple uploaded files under a single required document type, with reviewer selection controlling the visible preview.
- Allow field value edits independently from verified checkbox state.
- Keep fields unverified until explicitly checked, even after edits.
- Calculate group completion only when:
  - All group documents are in `Verified` state.
  - All group field checkboxes are checked.
- Show real-time progress across groups and explicit blockers within the selected group.
- Include enough sample data to exercise all five verification groups and major edge cases.

### Deliverables
- Fully interactive UI mockup runnable locally.
- Stateful sample application data covering 10-20 documents.
- Functional group progress and blocker calculations.
- Functional reopen comment validation and simulated notification feedback.
- Notes documenting remaining production or stakeholder questions outside the mockup.

### Exit criteria
- A reviewer can complete an end-to-end mock verification session in the prototype.
- All document states, allowed reviewer transitions, field edits, field verification checks, and group completion rules behave as specified.
- The mockup is suitable for stakeholder review before production design or LWC implementation planning.