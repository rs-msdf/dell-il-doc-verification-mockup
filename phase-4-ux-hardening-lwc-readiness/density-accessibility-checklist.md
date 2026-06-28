# Density and Accessibility Checklist

## 1. Density and scanability

- [ ] Summary page still scans when a case has 10-20 total documents across groups.
- [ ] Group cards show enough progress detail without becoming visually crowded.
- [ ] Missing-work text remains actionable and does not duplicate other counts in a confusing way.
- [ ] Drilldown page keeps document review and field review separate at a glance.
- [ ] Document tabs remain usable when a group has several required document items.
- [ ] Uploaded-file tabs remain usable when one required document has multiple uploads.
- [ ] The selected document action area remains visible enough when preview and field content are long.
- [ ] Reopened, not-uploaded, uploaded, verified, and doesn't-exist states are visually distinct where they need to be.
- [ ] Required comments draw attention without overwhelming normal review work.

## 2. Keyboard and focus

- [ ] A keyboard user can move from the summary page into a group card and back.
- [ ] Focus order follows the visual workflow: header, group cards, back button, document tabs, file tabs, preview, actions, fields.
- [ ] Active document and file tabs have clear focus and selected states.
- [ ] Reopen and acceptance comment fields receive focus when opened.
- [ ] Disabled or unavailable actions are either hidden or explained consistently.
- [ ] Keyboard users can submit and cancel comment drafts.

## 3. Labels and semantics

- [ ] Buttons have meaningful accessible names.
- [ ] Status badges are supported by nearby text and not color alone.
- [ ] Form controls have labels that remain clear when scanned quickly.
- [ ] Required comment validation is announced through visible text near the field.
- [ ] Page headings clearly identify whether the reviewer is on the summary page or a drilldown page.

## 4. Responsive behavior

- [ ] The summary page remains readable on tablet-width screens.
- [ ] Drilldown layout avoids overlap when preview, actions, and fields stack.
- [ ] Long labels, comments, and file names wrap without breaking controls.
- [ ] Action buttons remain reachable near the selected document context.

## 5. Visual quality

- [ ] Attention styling is consistent for items requiring reviewer action.
- [ ] Complete states are calm and do not compete with unresolved work.
- [ ] Comment panels are visually tied to the action or document they explain.
- [ ] The visual language remains close enough to Salesforce Lightning expectations for future LWC planning.

## 6. Review result

| Area | Pass / Risk / Fail | Notes | Follow-up |
| --- | --- | --- | --- |
| Density | Risk | Current sample covers all five groups and major edge cases, but larger 10-20 document scanability still needs stakeholder review. | Run summary and drilldown walkthrough with a denser case or reviewer proxy. |
| Keyboard and focus | Risk | Automated spot checks confirmed keyboard focus reaches group cards and reopen moves focus to the textarea. Full keyboard order review remains open. | Complete manual tab-order review across document tabs, file tabs, actions, fields, and back navigation. |
| Labels and semantics | Risk | ARIA labels and tab roles exist in the prototype, but assistive-technology expectations have not been fully reviewed. | Review accessible names, status announcement expectations, and validation-message behavior. |
| Responsive behavior | Pass | Initial horizontal overflow at tablet and mobile widths was fixed and validated at 1024px and 390px. | Recheck after any future layout changes. |
| Visual quality | Risk | Attention-state styling is consistent from Phase 3, but wording and visual hierarchy still need stakeholder review. | Review with operations stakeholders for fairness, clarity, and accountability. |