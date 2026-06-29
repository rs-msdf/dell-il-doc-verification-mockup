# Phase 3 State and Completion Model

## 1. State ownership

Phase 3 should replace static display strings with derived state where possible.

Recommended top-level prototype state:

```ts
type PrototypeState = {
  selectedGroupId: string;
  selectedDocumentIdByGroup: Record<string, string>;
  selectedFileIdByDocument: Record<string, string>;
  groups: VerificationGroup[];
  activeReopenDraft?: ReopenDraft;
  notifications: PrototypeNotification[];
};
```

The shape does not need to become production architecture. It only needs to make document states, field checks, selected items, blockers, and progress explicit enough for validation.

## 2. Core entities

```ts
type DocumentState = 'Not uploaded' | 'Uploaded' | "Doesn't exist" | 'Reopened' | 'Verified';
type MissingDocumentReturnState = 'Not uploaded' | "Doesn't exist";

type VerificationGroup = {
  id: string;
  name: string;
  documents: RequiredDocumentItem[];
  fields: ApplicationField[];
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

type UploadedFile = {
  id: string;
  filename: string;
  uploadLabel: 'Initial upload' | 'Applicant replacement' | 'Requested correction replacement';
  uploadedAt: string;
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
```

## 3. Allowed reviewer transitions

| Current state | Available reviewer actions | Result state | Comment required |
| --- | --- | --- | --- |
| `Not uploaded` | Verify | `Verified` | Yes |
| `Uploaded` | Verify | `Verified` | No |
| `Uploaded` | Reopen | `Reopened` | Yes |
| `Doesn't exist` | Verify | `Verified` | Yes |
| `Doesn't exist` | Reopen | `Reopened` | Yes |
| `Reopened` | Verify | `Verified` | No |
| `Verified` | Unverify | `Uploaded`, `Not uploaded`, or `Doesn't exist` | No |
| `Verified` | Reopen | `Reopened` | Yes |

`Doesn't exist` remains a candidate-side document state. The reviewer does not set a document to `Doesn't exist`; the reviewer can only accept it as verified with an explanatory comment or reopen it for correction. A reviewer can also verify a `Not uploaded` item with the same required explanatory comment when staff determines the document does not exist and accepts that non-existence in one step.

When a `Verified` document is unverified, the prototype returns it to the right reviewable state: documents with uploaded files return to `Uploaded`, missing documents accepted from `Not uploaded` return to `Not uploaded`, and missing documents previously marked `Doesn't exist` by the applicant return to `Doesn't exist`. The optional `missingDocumentReturnState` preserves that distinction after a no-file document is verified.

## 4. Unsupported transitions

The UI should not expose these as available actions:

- `Not uploaded` to `Reopened`.
- Any reviewer action that changes uploaded file history.

If a future stakeholder asks for one of these transitions, document the request as an open question instead of adding it silently.

## 5. Reopen draft validation

A reopen draft exists only while the reviewer is preparing a correction request.

```ts
type ReopenDraft = {
  groupId: string;
  documentId: string;
  comment: string;
  touched: boolean;
};
```

Validation rules:

- Empty or whitespace-only comments are invalid.
- `Send correction request` is disabled until the comment is valid.
- The selected-group blocker row should include a pending reopen-comment blocker while the draft is invalid.
- Submitting a valid comment creates a reviewer comment entry and a simulated notification entry.

## 6. Completion calculations

### Document completion

```ts
const documentIsComplete = (documentItem: RequiredDocumentItem) =>
  documentItem.state === 'Verified';
```

### Field completion

```ts
const fieldIsComplete = (field: ApplicationField) => field.checked;
```

### Group completion

```ts
const groupIsComplete = (group: VerificationGroup) =>
  group.documents.every(documentIsComplete) && group.fields.every(fieldIsComplete);
```

### Overall progress

```ts
const completedGroupCount = groups.filter(groupIsComplete).length;
const totalGroupCount = groups.length;
```

The UI should render progress from these calculations rather than keeping hardcoded strings such as `2 of 5 groups complete`.

## 7. Blocker calculations

```ts
type GroupBlockers = {
  unverifiedDocuments: RequiredDocumentItem[];
  uncheckedFields: ApplicationField[];
  pendingReopenComment: boolean;
  pendingAbsenceAcceptanceComment: boolean;
};
```

Rules:

- `unverifiedDocuments` includes every document whose state is not `Verified`.
- `uncheckedFields` includes every field whose `checked` value is false.
- `pendingReopenComment` is true only when the selected group has an active invalid reopen draft.
- `pendingAbsenceAcceptanceComment` is true only when the selected group has an active invalid acceptance draft for a `Doesn't exist` document.
- Total blockers is the sum of unverified documents, unchecked fields, pending reopen comment validation, and pending missing-document acceptance comment validation.

## 8. Derived display values

Group cards should derive:

- Documents complete count.
- Fields complete count.
- Complete or incomplete status.
- Missing-work details, such as documents needing review and unchecked fields, instead of a total blocker count.

Selected workspace should derive:

- Current group status.
- Missing-work chips.
- Document tab status.
- Available selected-document actions.
- Preview availability.
- Completion feedback after each action.

## 9. Prototype notification model

```ts
type PrototypeNotification = {
  id: string;
  documentId: string;
  message: string;
  createdAt: string;
};
```

Notifications are local UI feedback only. They simulate the candidate email trigger required by the workflow, but they do not represent production notification infrastructure.
