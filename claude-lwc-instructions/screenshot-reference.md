# Screenshot Reference

Use these screenshots as visual and interaction references for the Salesforce LWC build. They show the required reviewer workflow, state visibility, validation behavior, and field-only task handling. They are not pixel-perfect implementation specs.

## Summary and Navigation

### 01 Summary

Shows applicant identity, application reference, program, derived progress, and all verification task cards with document/field completion and missing-work text.

![Summary view](images/01-summary.png)

### 02 Applicant ID Uploaded Actions

Shows a document-backed drilldown with document tabs, uploaded-file tabs, preview placeholder, applicant comment, Verify/Reopen actions for an `Uploaded` document, and confirmation fields.

![Applicant ID uploaded actions](images/02-applicant-id-uploaded-actions.png)

## Reopen Flow

### 03 Reopen Comment Required

Shows the inline correction request draft and required-comment validation before a Reopen state change is allowed.

![Reopen comment required](images/03-reopen-comment-required.png)

### 04 Reopened Notification

Shows the result after sending a correction request: state changes to `Reopened`, the latest sent comment is visible, and notification feedback appears.

![Reopened notification](images/04-reopened-notification.png)

### 08 Reopened Sent Comment

Shows an existing `Reopened` document with a control to view the latest sent correction comment while waiting for candidate correction.

![Reopened sent comment](images/08-reopened-sent-comment.png)

## Missing Document Flow

### 05 Doesn't Exist Acceptance

Shows a `Doesn't exist` document with no preview, applicant comment context, and Verify/Reopen actions.

![Doesn't exist acceptance](images/05-doesnt-exist-acceptance.png)

### 06 Acceptance Comment Required

Shows the required missing-document acceptance comment before a `Doesn't exist` or `Not uploaded` document can be verified.

![Acceptance comment required](images/06-acceptance-comment-required.png)

### 07 Accepted Missing Document

Shows the result after accepting a missing document: state changes to `Verified` and the acceptance comment remains visible.

![Accepted missing document](images/07-accepted-missing-document.png)

## Field and Override Tasks

### 09 Last School Field-Only

Shows the field-only task with no required documents, no document actions, read-only official fields, and a required override field.

![Last school field-only](images/09-last-school-field-only.png)

### 10 Address Override

Shows a document-backed address task with read-only lookup fields, blank official address score, and required address score override field.

![Address override](images/10-address-override.png)