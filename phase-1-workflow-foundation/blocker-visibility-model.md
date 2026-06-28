# Blocker Visibility Model

The selected group view must make incomplete work explicit. Reviewers should not need to infer blockers only by manually scanning every document and field row.

## Blocker categories

| Category | What appears | Why it matters |
| --- | --- | --- |
| Unverified documents | Document name and current document state for every group document not in `Verified`. | A group cannot complete until every expected document item is verified. |
| Unchecked fields | Field label for every field whose verified checkbox is not checked. | A group cannot complete until every field is explicitly verified. |
| No-preview or comment-only context | Document name and context note when the document has no preview because it is `Doesn't exist` or has no file. | Reviewers need to know when their decision relies on applicant comments or surrounding group context. |
| Required reopen comments | Document name and missing reviewer comment when a reopen action is being represented. | Reopen decisions require comments and later trigger candidate correction notification. |

## Selected group blocker display

The blocker display appears with the selected group summary, focused status row, or a nearby detail panel. It should expose blocker categories in a stable order, either as compact counts or as detailed lists:

1. Unverified documents.
2. Unchecked fields.
3. No-preview or applicant-comment-only context.
4. Required reopen comments when relevant.

Example detailed structure for later phases:

```text
Missing items for Applicant ID

Unverified documents
- Back of ID: Uploaded
- ID appendix: Not uploaded

Unchecked fields
- Date of birth
- Marital status

Review context
- ID appendix has no uploaded preview. Review depends on applicant comment and group context.

Required reopen comments
- Back of ID: reopen comment required before correction request can be sent.
```

## Group navigation status

The group overview/navigation must show complete versus incomplete state at a glance.

Minimum Phase 1 status treatment:

| Group state | Navigation display |
| --- | --- |
| Complete | Group marked complete. |
| Incomplete | Group marked incomplete. |

Optional later enhancement:

| Enhancement | Purpose |
| --- | --- |
| Blocker count, such as `3 blockers` | Helps reviewers choose the next group without opening each group. Phase 2 uses this in the group overview. |

## Blocker calculation model

```text
unverifiedDocuments = group.documents where document.state != "Verified"
uncheckedFields = group.fields where field.verified != true
noPreviewContext = group.documents where document.state == "Doesn't exist" or document.files.length == 0
requiredReopenComments = pending reopen decisions where reviewerComment is empty
```

The no-preview context list is informational. It does not itself block completion if the document item is `Verified`; it helps reviewers understand when review is based on applicant comments and group context instead of a preview.

## Empty blocker state

When a selected group has no blockers, the blocker area should confirm the group is complete or ready to be treated as complete.

```text
No missing items. All required documents are verified and all fields are checked.
```

## Phase 1 constraints

- Blockers are defined for display and planning, not implemented as interactive validation.
- Required reopen comments are included in the model because reopen behavior is already part of the document state requirements, even though enforcement belongs to a later clickable phase.
- The blocker model supports `Doesn't exist` documents by making no-preview context visible without treating absence as automatically invalid.
