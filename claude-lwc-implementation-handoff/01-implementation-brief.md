# Implementation Brief for Claude Code

You are implementing the Dell IL Tech Leaders document verification reviewer workspace in Salesforce Lightning Web Components.

The existing mockup is a Vite + React + TypeScript prototype. Do not port React directly. Rebuild the experience in idiomatic LWC, using Salesforce Lightning Design System patterns and component composition, while preserving the behavior documented in this folder.

## Product goal

Create a reviewer-facing workspace that lets verification reviewers process 10-20 applicant documents quickly and confidently by combining two checks in one flow:

1. Document validity: the file is the correct required document, readable, and tied to the right person.
2. Application consistency: the document evidence matches the submitted application fields.

The UI must reduce reviewer uncertainty by making every verification decision explicit, traceable, and easy to justify.

## Implementation scope

Build a clickable LWC implementation of the current prototype:

- Application header with applicant identity and overall group progress.
- Summary page with five verification group cards.
- Drilldown page for a selected group, with back navigation.
- Document tabs for the required documents in the selected group.
- Uploaded-file tabs for a selected document when multiple uploaded files exist.
- Preview panel or no-preview state.
- Applicant comment visibility for each document.
- Valid document decision actions derived from state.
- Required reopen comment flow with validation and notification feedback.
- Required missing-document acceptance comment flow for `Not uploaded` and `Doesn't exist` verification.
- Sent correction comment visibility for reopened documents.
- Editable application fields with independent confirmation checkboxes.
- Derived group completion, overall progress, and blocker chips.

## Implementation constraints

- Use Lightning Web Components, not Aura and not React.
- Use SLDS classes and Lightning base components where they fit.
- Keep the UI desktop-first. The original requirements do not require a mobile layout, but the implementation should avoid obvious horizontal overflow.
- Do not add backend, OCR, ML, notification infrastructure, file storage, or persistence unless the Salesforce project already provides those services.
- Keep sample data local or mock-backed until real Salesforce objects and Apex contracts are supplied.
- Do not silently add unsupported document transitions. If a requirement seems missing, document it as an open question.
- Distinguish reviewer actions from applicant or external data updates. Applicant-side upload changes should be accepted from refreshed data, not exposed as reviewer buttons.
- Keep state rules centralized enough that child components do not each invent their own transition logic.

## Suggested build order

1. Create a parent `verificationWorkspace` LWC that owns sample state and selected page/group/document/file IDs.
2. Implement `verificationHeader` and `groupSummaryPage` with `verificationGroupCard`.
3. Implement `groupDrilldownPage` with document tabs, file tabs, preview/no-preview, and field list.
4. Implement document decision actions for Verify, Unverify, Reopen, and View/Hide sent comment.
5. Add reopen and missing-document acceptance comment panels with validation and focus behavior.
6. Add derived blockers, group completion, and progress recalculation after every interaction.
7. Compare against the screenshot manifest and acceptance checklist.

## Key behavior to preserve

The UI is complete only when it can demonstrate these scenarios:

- A reviewer opens a group from the summary and returns without losing state.
- The default selected document is the first document needing attention.
- Multiple uploaded files can be selected independently from document state.
- `Uploaded` documents can be verified or reopened.
- `Verified` documents can be unverified back to the correct reviewable state.
- `Reopened` documents show the latest sent correction comment and can later be verified.
- A `Reopened` document can return to `Uploaded` when refreshed data shows an applicant replacement upload.
- `Not uploaded` and `Doesn't exist` documents require an acceptance comment before verification.
- Reopen requires a non-empty comment and shows simulated candidate notification feedback.
- Editing a field value does not automatically confirm the field.
- A group completes only when all documents are `Verified` and all fields are checked.
