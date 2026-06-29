# Screenshot Manifest

The `screenshots/` directory contains Playwright-captured references from the current clickable mockup. Use these images as visual and behavioral references, not as exact pixel specifications.

Treat screenshots as state references. Preserve the workflow, hierarchy, and state treatment first; adapt layout to Salesforce Lightning conventions during LWC implementation. At desktop widths, prefer an SLDS-appropriate multi-card or grid layout for the summary page when space allows, even if a captured screenshot shows stacked cards.

## Screenshots

| File | What it shows | Implementation notes |
| --- | --- | --- |
| `screenshots/01-summary-overview.png` | Summary page with application header, progress pill, and group cards. | Group cards must show status, document count, field count, and missing-work text. |
| `screenshots/02-applicant-id-drilldown-back-id-uploaded.png` | Applicant ID drilldown with Back of ID selected in `Uploaded` state. | Shows document tabs, file tabs, preview, applicant comment, field verification rows, and blockers. |
| `screenshots/03-applicant-id-file-history-initial-upload.png` | Applicant ID Back of ID after selecting the older initial upload file. | File-tab selection must change preview metadata without changing document state. |
| `screenshots/04-reopen-comment-required.png` | Reopen flow with empty correction comment after blur. | Validation appears near the textarea; send action is disabled or blocked. |
| `screenshots/05-reopen-sent-comment-and-notification.png` | Reopen submitted with latest sent comment visible and notification feedback. | Document moves to `Reopened`, comment is stored, notification feedback appears. |
| `screenshots/06-parent-2-doesnt-exist-no-preview.png` | Parent 2 ID appendix in `Doesn't exist` state with no preview. | Reviewer sees applicant comment and no-preview message; Verify and Reopen are available. |
| `screenshots/07-missing-document-acceptance-required.png` | Missing-document Verify flow with empty acceptance comment. | Acceptance comment is required before `Doesn't exist` can become `Verified`. |
| `screenshots/08-missing-document-accepted.png` | Missing-document acceptance submitted. | Document becomes `Verified`; acceptance comment is visible in history. |
| `screenshots/09-applicant-income-not-uploaded.png` | Applicant Income 2024 Benefits document in `Not uploaded` state. | No uploaded files; no-preview state; Verify requires acceptance comment. |
| `screenshots/10-summary-after-state-changes.png` | Summary page after scripted interactions. | Demonstrates state persistence and derived group counts after navigation. |

## Suggested visual comparison workflow

1. Implement the LWC summary page and compare with `01-summary-overview.png`.
2. Implement Applicant ID drilldown and compare with `02-applicant-id-drilldown-back-id-uploaded.png`.
3. Add file selection and compare with `03-applicant-id-file-history-initial-upload.png`.
4. Add reopen validation and compare with `04-reopen-comment-required.png`.
5. Add reopen submit feedback and compare with `05-reopen-sent-comment-and-notification.png`.
6. Add no-preview and missing-document acceptance behavior and compare with `06`, `07`, `08`, and `09`.
7. Return to summary and confirm derived state changes match `10-summary-after-state-changes.png`.
