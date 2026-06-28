# Stakeholder Review Plan

## 1. Review purpose

Use the completed Phase 3 prototype to test whether the document verification workflow is understandable, accountable, and ready for production-planning conversations.

The review should focus on reviewer interpretation, not on whether every future production feature exists in the mockup.

## 2. Participants

- Program operations stakeholders who understand application review policy.
- Reviewers or reviewer proxies who understand document verification work.
- Product or delivery owner for prioritizing follow-up decisions.
- Salesforce/LWC implementation representative, if available.

## 3. Session format

Recommended duration: 45-60 minutes.

1. Introduce the prototype goal and remind participants that this is frontend-only.
2. Ask participants to complete the review scenarios without explaining every control first.
3. Capture observations in the log below.
4. Group observations into prototype refinements, policy questions, and production implementation questions.
5. Confirm which items must be resolved before LWC implementation planning.

## 4. Review scenarios

### Scenario A: Choose the next group

1. Start on the summary page.
2. Ask which group should be reviewed next and why.
3. Ask what information is missing from the summary, if any.

Success signal: participants can use group status, document progress, field progress, and missing-work text to choose a group.

### Scenario B: Resolve an uploaded document

1. Open Applicant ID.
2. Select an uploaded document that still needs review.
3. Inspect the uploaded-file tabs and preview.
4. Verify the document.
5. Explain what changed in the group status.

Success signal: participants understand the selected document state, file history, decision action, and completion update.

### Scenario C: Reopen a document

1. Open a verified document.
2. Reopen it.
3. Try submitting without a comment.
4. Enter a correction comment and submit.
5. Explain what the applicant receives and what the reviewer can see afterward.

Success signal: participants understand that comments are required, traceable, and tied to a simulated candidate notification.

### Scenario D: Accept a missing document

1. Open a `Doesn't exist` document.
2. Review the applicant comment and no-preview state.
3. Verify it with an acceptance comment.
4. Explain why that document can be treated as complete.

Success signal: participants understand comment-only acceptance and reviewer accountability.

### Scenario E: Edit and confirm fields

1. Open Applicant Income.
2. Edit an application field.
3. Confirm the field separately.
4. Explain whether editing alone completes the field.

Success signal: participants distinguish data correction from verification confirmation.

## 5. Observation log

| Observation | Scenario | Severity | Proposed response | Owner | Category |
| --- | --- | --- | --- | --- | --- |
|  |  | Low / Medium / High |  |  | Prototype / Policy / Production |

## 6. Decision log

| Decision needed | Context | Options | Recommendation | Owner | Status |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  | Open |