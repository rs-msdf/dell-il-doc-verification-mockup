# LWC Component Plan

These are recommended component boundaries for the Salesforce implementation. Names are planning names; adapt them to the repository naming conventions.

## 1. Page-level components

| Component | Responsibility | Key public API / events |
| --- | --- | --- |
| `verificationWorkspace` | Owns state, derives progress/blockers, handles navigation and state transitions. | None, or `@api recordId` when wired to Salesforce data. |
| `verificationHeader` | Shows applicant identity, application reference, program, and overall progress. | `@api applicant`, `@api completedGroupCount`, `@api totalGroupCount`. |
| `groupSummaryPage` | Renders all group cards. | `@api groups`; emits `groupselect`. |
| `groupDrilldownPage` | Renders selected group workflow and back navigation. | `@api group`, `@api selectedDocument`, `@api selectedFile`, `@api blockers`; emits navigation and child action events. |

## 2. Summary components

| Component | Responsibility |
| --- | --- |
| `verificationGroupCard` | Single selectable group card with title, status, document count, field count, and missing-work text. |
| `overallProgressIndicator` | Reusable progress pill. Can be folded into `verificationHeader` if simple. |

## 3. Document review components

| Component | Responsibility |
| --- | --- |
| `documentTabList` | Renders required document tabs for selected group and emits selected document ID. |
| `documentTab` | Displays document name and `Verified` / `Needs review` tab status. |
| `uploadedFileTabList` | Renders uploaded-file tabs with timestamp labels and emits selected file ID. |
| `documentPreviewPanel` | Shows selected file preview placeholder or no-preview state, plus a compact preview-inspection or full-screen affordance when a selected file exists. Production version should later handle secure file rendering. |
| `documentDecisionPanel` | Shows valid actions for selected document state and emits `verify`, `unverify`, `startreopen`, and `togglesentcomment`. |
| `reopenCommentPanel` | Collects required correction comment, validates, focuses on reveal, emits `submit` and `cancel`. |
| `missingDocumentAcceptancePanel` | Collects required absence acceptance rationale, validates, focuses on reveal, emits `submit` and `cancel`. |
| `sentCommentPanel` | Displays latest sent correction comment for reopened documents. |
| `applicantCommentPanel` | Displays applicant comment for the selected document. |
| `notificationFeedback` | Shows local simulated candidate-notification feedback. |

## 4. Field review components

| Component | Responsibility |
| --- | --- |
| `applicationFieldReviewList` | Renders field rows for the selected group. |
| `applicationFieldReviewRow` | Shows field label, note, editable value, confirmation checkbox, and edited marker. Emits value and checked changes. |

## 5. Status components

| Component | Responsibility |
| --- | --- |
| `statusBadge` | Shared document/group status visual treatment. |
| `blockerChipList` | Selected-group blocker chips by category. |

## 6. Suggested event contracts

Child components should emit semantic events and let the parent update state.

```js
// groupSummaryPage -> verificationWorkspace
this.dispatchEvent(new CustomEvent('groupselect', { detail: { groupId } }));

// documentTabList -> groupDrilldownPage or verificationWorkspace
this.dispatchEvent(new CustomEvent('documentselect', { detail: { documentId } }));

// uploadedFileTabList -> parent
this.dispatchEvent(new CustomEvent('fileselect', { detail: { documentId, fileId } }));

// documentDecisionPanel -> parent
this.dispatchEvent(new CustomEvent('verifydocument'));
this.dispatchEvent(new CustomEvent('unverifydocument'));
this.dispatchEvent(new CustomEvent('startreopen'));
this.dispatchEvent(new CustomEvent('togglesentcomment'));
this.dispatchEvent(new CustomEvent('viewpreview', { detail: { documentId, fileId } }));

// comment panels -> parent
this.dispatchEvent(new CustomEvent('submitreopen', { detail: { comment } }));
this.dispatchEvent(new CustomEvent('submitabsenceacceptance', { detail: { comment } }));
this.dispatchEvent(new CustomEvent('cancel'));

// field row -> parent
this.dispatchEvent(new CustomEvent('fieldvaluechange', { detail: { fieldId, value } }));
this.dispatchEvent(new CustomEvent('fieldcheckedchange', { detail: { fieldId, checked } }));
```

## 7. Salesforce and SLDS notes

- Prefer `lightning-button`, `lightning-textarea`, `lightning-input`, `lightning-icon`, and `lightning-badge` where they support the interaction cleanly.
- Use SLDS utility classes for layout and spacing, but custom CSS is acceptable for the document preview placeholder and dense workspace arrangement.
- Do not put document transition rules inside individual button components. The parent state owner should decide available actions.
- Production file previews will need secure file access, file type handling, loading states, errors, and permissions. The mock implementation can use preview placeholders.
- The preview-inspection action may be disabled or handled as a no-op in the mock implementation if no production file viewer is available.
- Production notification feedback should eventually reflect actual async status. The mock implementation can keep a local notification object.
- Production comments should be auditable. The mock implementation can store comments locally in component state.

## 8. Open implementation questions to preserve

Do not solve these silently during the first LWC build:

- Should document transition rules live in Apex, a client state service, or parent LWC logic?
- Are field edits saved immediately, staged until group completion, or staged until final application submission?
- Should sent comments show only the latest comment or full correction history?
- Are missing-document acceptance comments a separate object, a reviewer note, or part of document status history?
- How should production file preview handle loading, unsupported file types, virus-scan delays, and access errors?
