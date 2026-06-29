# Completion Logic Model

This model defines the initial Phase 1 completion rules for documents, fields, groups, and the whole application. The logic is intentionally simple and explicit so later prototype phases can implement it without changing the workflow foundation.

## Document states

The required document item can be in one of these states:

| State | Meaning for Phase 1 completion |
| --- | --- |
| `Not uploaded` | Incomplete. No reviewable file exists. |
| `Uploaded` | Incomplete until reviewer verifies the required document item. |
| `Doesn't exist` | Incomplete until reviewer verifies that the document absence is acceptable based on applicant comments and group context. |
| `Reopened` | Incomplete. Awaiting candidate correction or replacement upload before review can continue. |
| `Verified` | Complete for document-level completion. |

The state applies to the required document item, not to individual uploaded file entries.

## Document completion rule

A document is complete only when its state is `Verified`.

```text
documentComplete = document.state == "Verified"
```

## Field completion rule

A field is complete only when its verified checkbox is explicitly checked.

```text
fieldComplete = field.verified == true
```

Editing a field value does not complete the field. The reviewer must still check the verified checkbox.

## Group completion rule

A group is complete only when all documents in the group are `Verified` and all fields in the group are checked as verified.

```text
groupComplete = every(group.documents, documentComplete)
             and every(group.fields, fieldComplete)
```

## Application completion rule

The application is complete only when all five groups are complete.

```text
applicationComplete = every(application.groups, groupComplete)
```

## Top-level progress rule

Top-level progress is represented by group completion count only.

```text
completedGroups = count(application.groups where groupComplete)
totalGroups = 5
progressLabel = completedGroups + " of " + totalGroups + " groups complete"
```

The header must not use document count, field count, or a combined percentage as the primary progress indicator.

## Initial reviewer transition awareness

Phase 1 identifies the reviewer transitions needed later, but does not implement interaction behavior.

| Current state | Reviewer transition identified for later phases |
| --- | --- |
| `Uploaded` | Can become `Verified` or `Reopened` with required comment. |
| `Verified` | Can become `Reopened` with required comment. |
| `Doesn't exist` | Can become `Verified` or `Reopened` with required comment. |
| `Not uploaded` | Can become `Verified` with a required comment when staff verifies that the document does not exist. |
| `Reopened` | Review resumes only after applicant replacement upload returns the item to review-ready status. |

## Completion examples

| Scenario | Result |
| --- | --- |
| All documents verified, one field unchecked | Group incomplete. |
| One document uploaded but not verified, all fields checked | Group incomplete. |
| A `Doesn't exist` document is verified and all fields are checked | The `Doesn't exist` document is complete, and the group can complete if all other documents are verified. |
| A reopened document has no replacement upload | Group incomplete. |
| All five groups complete | Application complete. |
