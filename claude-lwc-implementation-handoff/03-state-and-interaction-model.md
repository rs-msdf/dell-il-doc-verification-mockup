# State and Interaction Model

This file describes the behavior that the LWC implementation must preserve from the current prototype.

## 1. Core types

Use these names conceptually even if the Salesforce data layer uses different object or field names.

```ts
type DocumentState = 'Not uploaded' | 'Uploaded' | "Doesn't exist" | 'Reopened' | 'Verified';
type MissingDocumentReturnState = 'Not uploaded' | "Doesn't exist";
type GroupStatus = 'Complete' | 'Incomplete';

type UploadedFile = {
  id: string;
  filename: string;
  uploadLabel: 'Initial upload' | 'Applicant replacement' | 'Requested correction replacement';
  uploadedAt: string;
};

type ReviewerComment = {
  id: string;
  comment: string;
  createdAt: string;
};

type RequiredDocumentItem = {
  id: string;
  name: string;
  state: DocumentState;
  applicantComment: string;
  uploadedFiles: UploadedFile[];
  reviewerComments: ReviewerComment[];
  missingDocumentReturnState?: MissingDocumentReturnState;
  absenceAcceptanceComments?: ReviewerComment[];
};

type ApplicationField = {
  id: string;
  label: string;
  value: string;
  inputType: 'text' | 'number' | 'date' | 'select';
  checked: boolean;
  note: string;
  editedInSession: boolean;
};

type VerificationGroup = {
  id: string;
  name: string;
  documents: RequiredDocumentItem[];
  fields: ApplicationField[];
};

type ReopenDraft = {
  groupId: string;
  documentId: string;
  comment: string;
  touched: boolean;
};

type AbsenceAcceptanceDraft = {
  groupId: string;
  documentId: string;
  comment: string;
  touched: boolean;
};

type PrototypeNotification = {
  id: string;
  documentId: string;
  message: string;
  createdAt: string;
};
```

## 2. Recommended parent state

The parent LWC should own the current workflow state or receive it from an equivalent state service:

```ts
type WorkspaceState = {
  currentPage: 'summary' | 'drilldown';
  selectedGroupId: string;
  selectedDocumentIdByGroup: Record<string, string>;
  selectedFileIdByDocument: Record<string, string>;
  groups: VerificationGroup[];
  activeReopenDraft: ReopenDraft | null;
  activeAbsenceAcceptanceDraft: AbsenceAcceptanceDraft | null;
  visibleSentCommentDocumentId: string | null;
  notifications: PrototypeNotification[];
};
```

In production, this may be backed by LDS, Apex, or a wrapper object. For the mock implementation, local component state is acceptable.

## 3. Derived helpers

Document completion:

```ts
documentItem.state === 'Verified'
```

Field completion:

```ts
field.checked === true
```

Group completion:

```ts
group.documents.every(documentIsComplete) && group.fields.every(fieldIsComplete)
```

Overall progress:

```ts
groups.filter(groupIsComplete).length + ' of ' + groups.length + ' groups complete'
```

Group blockers:

```ts
{
  unverifiedDocuments: group.documents.filter((documentItem) => documentItem.state !== 'Verified'),
  uncheckedFields: group.fields.filter((field) => !field.checked),
  pendingReopenComment: activeReopenDraft belongs to group && activeReopenDraft.comment.trim() === '',
  pendingAbsenceAcceptanceComment: activeAbsenceAcceptanceDraft belongs to group && activeAbsenceAcceptanceDraft.comment.trim() === '',
}
```

Total blockers equals the sum of those categories.

## 4. Default selection rules

When a group opens, select the first document that needs attention. If all documents are verified, select the first document.

Attention order:

1. `Uploaded`
2. `Doesn't exist`
3. `Not uploaded`
4. `Reopened`
5. `Verified`

When a document has uploaded files, select the latest file by default. Preserve the reviewer's file selection while the document remains selected.

## 5. Available actions by state

```ts
canVerify = state in ['Uploaded', 'Reopened', "Doesn't exist", 'Not uploaded'];
canUnverify = state === 'Verified';
canReopen = state in ['Uploaded', 'Verified', "Doesn't exist"];
canViewSentComment = state === 'Reopened' && reviewerComments.length > 0;
```

Do not render invalid actions. For example, `Not uploaded` must not expose `Reopen`.

## 6. Applicant and external data updates

These transitions are not reviewer actions and should not render as decision buttons. They represent applicant activity or refreshed Salesforce data received by the workspace.

```ts
// Applicant uploads a first file for a missing document.
'Not uploaded' + applicantUpload => 'Uploaded'

// Applicant states the document does not exist.
'Not uploaded' + applicantMarksDoesNotExist => "Doesn't exist"

// Applicant responds to a correction request with a replacement file.
'Reopened' + applicantReplacementUpload => 'Uploaded'
```

For `Reopened -> Uploaded` after a replacement upload:

- Preserve prior `reviewerComments` as sent correction history.
- Add the new uploaded file with `uploadLabel = 'Requested correction replacement'` when that source is known.
- Clear local notification feedback only if the production design wants notification state to reflect the latest applicant response; otherwise keep it as historical feedback.
- Recalculate blockers and progress because the document is reviewable again but not complete until a reviewer verifies it.
- Select the latest uploaded file by default for the refreshed document unless the parent state intentionally preserves a reviewer-selected historical file.

## 7. Verify interaction

For `Uploaded` and `Reopened`:

1. Set selected document state to `Verified`.
2. Clear active drafts for that document.
3. Recalculate blockers and progress.
4. Keep selected document open.

For `Not uploaded` and `Doesn't exist`:

1. Reveal the missing-document acceptance panel.
2. Require a non-empty comment.
3. On submit, store the acceptance comment.
4. Set state to `Verified`.
5. Store `missingDocumentReturnState` as the prior missing state.
6. Recalculate blockers and progress.

## 8. Unverify interaction

Only available for `Verified`.

Return state rule:

- If uploaded files exist, return to `Uploaded`.
- If no uploaded files exist and `missingDocumentReturnState` is `Doesn't exist`, return to `Doesn't exist`.
- If no uploaded files exist otherwise, return to `Not uploaded`.

Preserve uploaded-file history, comments, and selected file.

## 9. Reopen interaction

Only available for `Uploaded`, `Verified`, and `Doesn't exist`.

Flow:

1. Reveal correction comment panel directly under decision buttons.
2. Focus the textarea.
3. Disable or block send until comment is non-empty.
4. On valid send, create a reviewer comment with timestamp.
5. Set state to `Reopened`.
6. Create local notification feedback with message `Correction request queued for candidate`.
7. Show latest sent correction comment.
8. Recalculate blockers and progress.

Cancel clears only the current draft and preserves prior state.

## 10. Missing-document acceptance interaction

The acceptance panel has the same draft lifecycle as reopen, but it records why a missing document can be accepted without an upload.

Flow:

1. Reveal the acceptance comment panel after Verify is selected on `Not uploaded` or `Doesn't exist`.
2. Focus the textarea.
3. Disable or block submit until comment is non-empty.
4. On valid submit, create an acceptance comment with timestamp.
5. Store `missingDocumentReturnState` from the prior document state.
6. Set state to `Verified`.
7. Recalculate blockers and progress.

Cancel clears only the current acceptance draft and preserves prior state.

## 11. Field interaction

Edit field:

- Update `field.value`.
- Set `editedInSession = true`.
- Do not change `field.checked`.

Toggle field confirmation:

- Set `field.checked` to the checkbox value.
- Recalculate blockers and progress.

## 12. Navigation interaction

- Summary page opens first.
- Selecting a group sets selected group and opens drilldown.
- Back button returns to summary.
- State persists while moving between pages.
- Switching documents clears no persistent state except any UI focus context.
