# Claude Code LWC Implementation Handoff

This directory is the implementation package for rebuilding the Dell IL Tech Leaders document verification mockup in Salesforce Lightning Web Components.

Use this folder as the prompt context for Claude Code in the Salesforce repo. The goal is to translate the current runnable React prototype into Lightning Web Components while preserving the reviewer workflow, state rules, visible blockers, and visual hierarchy.

## How to use this package with Claude Code

1. Open the Salesforce project where the LWC implementation should live.
2. Copy or reference this entire `claude-lwc-implementation-handoff/` directory in that project.
3. Start Claude Code with `01-implementation-brief.md` as the first instruction file.
4. Give Claude Code the screenshots in `screenshots/` as visual references.
5. Ask Claude Code to implement the components incrementally, validating each interaction against `07-acceptance-checklist.md`.

## Files in this handoff

- `01-implementation-brief.md`: primary instruction prompt and implementation stance.
- `02-consolidated-requirements.md`: requirements combined from the root docs and Phase 1-4 planning files.
- `03-state-and-interaction-model.md`: document states, allowed transitions, blockers, and completion logic.
- `04-lwc-component-plan.md`: suggested Lightning Web Component boundaries, events, and Salesforce notes.
- `05-data-contract-and-fixtures.md`: expected sample data shape and fixture content to preserve.
- `06-screenshot-manifest.md`: named screenshot list with what each image proves.
- `07-acceptance-checklist.md`: functional, visual, accessibility, and LWC readiness checks.
- `screenshots/`: Playwright-captured PNG references from the current mockup.

## Source material summarized here

This handoff consolidates requirements from:

- `../mission.md`
- `../requirements.md`
- `../roadmap.md`
- `../technology-decisions.md`
- `../phase-1-workflow-foundation/`
- `../phase-2-medium-fidelity-static-mockup/`
- `../phase-3-clickable-workflow-prototype/`
- `../phase-4-ux-hardening-lwc-readiness/`

The current React prototype remains the behavioral reference, especially `../src/App.tsx` and `../src/styles.css`.
