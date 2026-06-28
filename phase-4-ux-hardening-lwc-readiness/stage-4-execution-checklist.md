# Stage 4 Execution Checklist

## 1. Prepare review

- [ ] Confirm the local prototype runs from the committed Phase 3 state.
- [ ] Select review participants and schedule stakeholder walkthrough.
- [ ] Confirm which scenarios from `stakeholder-review-plan.md` will be tested.
- [ ] Prepare the observation log and decision log.

## 2. Run stakeholder review

- [ ] Test summary-page group selection and prioritization.
- [ ] Test uploaded-document verification.
- [ ] Test reopen comment entry and sent-comment visibility.
- [ ] Test `Doesn't exist` acceptance with required reviewer comment.
- [ ] Test field editing and separate field confirmation.
- [ ] Capture wording, confidence, and accountability observations.

## 3. Run density and accessibility review

- [ ] Complete the density checklist.
- [ ] Complete keyboard and focus checks.
- [ ] Complete labels and semantics checks.
- [ ] Complete responsive behavior checks.
- [ ] Record visual hierarchy or scanability risks.

## 4. Refine implementation plan

- [ ] Review `lwc-component-inventory.md` with an implementation stakeholder.
- [ ] Decide which components should own state versus receive data/actions from a parent.
- [ ] Identify which prototype helpers map to production data services or Apex-backed logic.
- [ ] Update production-readiness questions with owners and status.

## 5. Close Phase 4

- [ ] Separate follow-up items into prototype refinements, policy decisions, and production implementation questions.
- [ ] Update this folder with review results.
- [ ] Update `roadmap.md` if Stage 4 changes future phase scope.
- [ ] Run `git diff --check` after documentation changes.
- [ ] Commit Phase 4 planning and review documentation.