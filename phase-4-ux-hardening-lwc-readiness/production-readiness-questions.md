# Production-Readiness Questions

These questions are intentionally outside the frontend-only mockup unless they affect stakeholder understanding of the workflow.

## 1. Data and persistence

- Where are document verification states stored?
- Are field edits saved immediately, staged per group, or submitted as a full application-review transaction?
- Does each document decision require a timestamp, reviewer ID, and prior-state record?
- Should missing-document acceptance comments be stored differently from reopen correction comments?
- What happens if two reviewers work on the same application at the same time?

## 2. Audit and compliance

- What audit trail is required for `Verified`, `Reopened`, `Uploaded`, and `Doesn't exist` decisions?
- Are reviewer comments immutable after submission?
- Should Unverify require a reason when reverting `Verified` to `Uploaded`, `Not uploaded`, or `Doesn't exist`?
- How long should document previews, comments, and decision history remain available?
- Which actions require supervisor review or elevated permissions?

## 3. Notifications

- Which event actually triggers candidate email or portal notification delivery?
- Does reopening one document send one notification immediately, or are multiple correction requests batched?
- What text is sent to the candidate, and who owns that template?
- How does the reviewer see notification delivery failure or retry status?

## 4. Files and preview

- Which file types must be previewed inline?
- What fallback appears for unsupported file types?
- How are deleted, replaced, expired, or permission-restricted files represented?
- Should reviewers be able to compare two uploaded files side by side?
- How does the UI handle long file names and multiple uploads from the same day?

## 5. Salesforce and LWC implementation

- Which data should load through Lightning Data Service, Apex, or another integration layer?
- Which components need to be reusable outside this application program?
- Which SLDS patterns must be followed exactly?
- Are there platform limits or performance concerns for rendering 10-20 documents with previews and fields?
- What automated tests are expected for LWC components and state transitions?

## 6. Policy and wording

- What wording is acceptable when asking a candidate to correct a document?
- What wording is acceptable when accepting a `Doesn't exist` document based on applicant comments?
- Does every incomplete state imply candidate action, reviewer action, or both?
- How should reviewers distinguish policy exceptions from ordinary verification decisions?

## 7. Question log

| Question | Category | Impact | Owner | Status | Notes |
| --- | --- | --- | --- | --- | --- |
|  | Data / Audit / Notification / File / Salesforce / Policy | Low / Medium / High |  | Open |  |