# Claude LWC Instructions

Use this folder as the handoff package for Claude Code when building the Dell IL Tech Leaders document verification UI as Lightning Web Components in a Salesforce org through a Salesforce MCP connection.

## Files

- `claude-code-prompt.md`: Starting prompt/instructions for Claude Code.
- `verification-requirements.md`: Product requirements, task inventory, state transitions, completion rules, and validation checklist.
- `screenshot-reference.md`: Captured UI screenshots and the interaction state each image represents.
- `images/`: Screenshot artifacts captured from the current clickable mockup.

## How to Use

1. Open Claude Code in the Salesforce workspace or repository connected to the target org.
2. Provide `claude-code-prompt.md` as the primary instruction file.
3. Tell Claude Code to treat `verification-requirements.md` as the requirements contract.
4. Tell Claude Code to use `screenshot-reference.md` and the images only as visual and interaction references.
5. Ensure Claude Code uses the configured Salesforce MCP to inspect the org, retrieve existing metadata, deploy changes, and validate behavior in the Salesforce instance.

## Scope Boundaries

These instructions intentionally focus on reviewer requirements, task types, state transitions, validation, and screenshots. They do not prescribe prototype implementation details or local mockup technology decisions.