# LWC Component Inventory

This inventory maps the Phase 3 prototype into candidate Salesforce Lightning Web Components. Names are planning labels, not final implementation names.

## 1. Page-level components

| Candidate component | Responsibility | Prototype source | Notes |
| --- | --- | --- | --- |
| `verificationWorkspace` | Owns application state, selected page, selected group, selected document, and progress derivation. | `src/App.tsx` | In production, state may split between Salesforce data services, parent container, and child events. |
| `verificationHeader` | Shows applicant identity, application reference, program, and overall progress. | Header section | Keep independent from document decision state where possible. |
| `groupSummaryPage` | Renders the group-card grid and summary instructions. | Summary page branch | Emits selected group ID. |
| `groupDrilldownPage` | Renders selected group workflow and back navigation. | Drilldown page branch | Coordinates document area, preview, actions, fields, and blockers. |

## 2. Summary components

| Candidate component | Responsibility | Prototype source | Notes |
| --- | --- | --- | --- |
| `verificationGroupCard` | Shows group title, status, document count, field count, and missing-work details. | Group card map | Should expose a single click target with clear accessible name. |
| `overallProgressIndicator` | Shows completed groups out of total groups. | Header progress pill | Could be reused outside this workspace if other review flows need it. |

## 3. Document review components

| Candidate component | Responsibility | Prototype source | Notes |
| --- | --- | --- | --- |
| `documentTabList` | Lists required documents for a group and selected state. | Document tabs | Needs clear selected, needs-review, and complete states. |
| `documentTab` | Represents one required document item. | Document tab button | Should include document name and review status. |
| `uploadedFileTabList` | Lists uploaded files for the selected document. | File tabs | Must handle timestamp-only labels and multiple upload types. |
| `documentPreviewPanel` | Shows selected uploaded file preview or no-preview state. | Preview panel | Production version will need secure file rendering and loading/error states. |
| `documentDecisionPanel` | Shows valid actions for selected document state. | Decision action area | Should receive allowed actions from state model instead of duplicating transition rules. |
| `reopenCommentPanel` | Collects required reviewer correction comment. | Inline reopen draft panel | Needs validation, focus management, and notification feedback. |
| `sentCommentPanel` | Displays latest sent correction comment for reopened documents. | Sent-comment reveal panel | Production version may need full comment history. |
| `missingDocumentAcceptancePanel` | Collects required acceptance rationale for `Doesn't exist` verification. | Absence acceptance draft panel | Should be auditable in production. |

## 4. Field review components

| Candidate component | Responsibility | Prototype source | Notes |
| --- | --- | --- | --- |
| `applicationFieldReviewList` | Renders all fields associated with the selected group. | Field rail | Should preserve separation between editing and confirming. |
| `applicationFieldReviewRow` | Shows editable value, confirmation checkbox, note, and edited marker. | Field row | Production version needs validation rules and save behavior. |

## 5. Status and feedback components

| Candidate component | Responsibility | Prototype source | Notes |
| --- | --- | --- | --- |
| `statusBadge` | Shared visual treatment for document and group states. | State badges and status pills | Needs consistent token mapping to SLDS. |
| `blockerChipList` | Shows selected-group blockers by category. | Selected-group status chips | Should avoid generic totals when actionable detail is available. |
| `notificationFeedback` | Shows simulated candidate-notification result. | Local notification feedback | Production version should reflect actual async notification status. |

## 6. Open component questions

- Should document transition rules live in a parent state service, Apex-backed controller, or individual action components?
- Should field edits be saved immediately, staged until group completion, or staged until full application submission?
- Should sent comments show only the latest comment or a full correction history?
- Should missing-document acceptance comments become a general decision-note component shared with reopen comments?
- How should production file previews handle loading, file type support, access errors, and virus-scan delays?