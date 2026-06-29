# Claude Code Prompt: Salesforce LWC Verification Workspace

You are implementing the Dell IL Tech Leaders document verification reviewer workspace in a Salesforce org using Lightning Web Components. Use the configured Salesforce MCP to inspect the org, retrieve relevant metadata, create or update Salesforce source, deploy changes, and validate the UI in the target Salesforce instance.

Treat `verification-requirements.md` as the product requirements contract. Treat `screenshot-reference.md` and the `images/` directory as visual references for layout, task flow, and interaction states. Do not port or depend on the local prototype implementation. Do not include local mockup technology decisions in your implementation notes or requirements interpretation.

## Required MCP Workflow

- Confirm the Salesforce MCP connection and target org before changing metadata.
- Inspect existing Lightning pages, LWC bundles, Apex/classes if relevant, static resources if relevant, permissions, and available data shape before adding new metadata.
- Prefer the target org's existing naming, page placement, data access, security, and deployment conventions after inspection.
- If an existing verification workspace exists, update it only as needed to meet the requirements. If none exists, create the smallest coherent Salesforce UI surface that satisfies the requirements.
- Use Salesforce MCP tools to retrieve, deploy, and validate changes. Run available org tests or focused checks before declaring completion.
- If a production data model, object mapping, permission rule, audit trail, or notification mechanism is missing or ambiguous, identify it as an open question instead of inventing hidden requirements.

## Product Goal

Build a reviewer-facing workspace for Dell IL Tech Leaders scholarship document verification. The reviewer must be able to make two coordinated checks in one flow:

- Document validity: the file is the correct required document, readable, and tied to the right person.
- Application consistency: submitted application values match the relevant evidence or accepted application context.

The UI must make every reviewer decision explicit, traceable, and easy to justify.

## Required Experience

Build two separate views, not a combined page:

- Summary view: shows the applicant identity, application reference, program name, overall progress, and all 14 selectable verification tasks.
- Task drilldown view: opens one selected task, includes back navigation, document evidence, document decision controls, file history, comments, field review, blockers, and completion state.

The summary and drilldown must preserve current review state when navigating back and forth.

## Non-Negotiable Behavior

- Render all 14 verification tasks listed in `verification-requirements.md`.
- Derive progress and completion from current state. Do not hardcode completion counts.
- Only show reviewer actions that are valid for the selected document's current state.
- Require a non-empty correction comment before Reopen can change state.
- Require a non-empty acceptance comment before a missing `Not uploaded` or `Doesn't exist` document can be verified.
- Keep document evidence and field review visually separate in the task drilldown.
- Support field-only tasks without crashing and without showing document actions.
- Preserve applicant comments, reviewer correction comments, missing-document acceptance comments, uploaded-file history, and simulated notification feedback where the target org supports equivalent persistence or display.

## State Transition Contract

Implement this document state behavior exactly:

| Current state | Available reviewer actions | Result | Comment required |
| --- | --- | --- | --- |
| `Not uploaded` | Verify | `Verified` | Yes, acceptance comment |
| `Uploaded` | Verify | `Verified` | No |
| `Uploaded` | Reopen | `Reopened` | Yes, correction comment |
| `Doesn't exist` | Verify | `Verified` | Yes, acceptance comment |
| `Doesn't exist` | Reopen | `Reopened` | Yes, correction comment |
| `Reopened` | Verify | `Verified` | No |
| `Verified` | Unverify | `Uploaded`, `Not uploaded`, or `Doesn't exist` | No |
| `Verified` | Reopen | `Reopened` | Yes, correction comment |

Unverify must return a verified document to the correct reviewable state:

- Documents with uploaded files return to `Uploaded`.
- Missing documents accepted from `Not uploaded` return to `Not uploaded`.
- Missing documents previously marked `Doesn't exist` by the applicant return to `Doesn't exist`.

Unsupported actions must not appear.

## Completion Contract

Document completion:

```text
documentComplete = document.state == "Verified"
```

Field completion:

```text
if field.verificationMode == "display-only": fieldComplete = true
if field.verificationMode == "value-presence": fieldComplete = trim(field.value) is not empty
otherwise: fieldComplete = field.checked == true
```

Task completion:

```text
taskComplete = every(task.documents, documentComplete)
            and every(task.fields, fieldComplete)
```

Field-only tasks have no documents, so document completion is vacuously complete and field requirements control completion.

## Expected Validation Before Completion

- Use the Salesforce MCP to deploy or preview the LWC changes in the target org.
- Validate every document state transition listed above.
- Validate all three field review modes.
- Validate summary-to-drilldown navigation and back navigation.
- Validate field-only tasks.
- Validate required comment errors for Reopen and missing-document acceptance.
- Capture or report evidence from the Salesforce instance showing the implemented UI meets the screenshot reference states.