# Doc Verification Mockup

This repository contains the Phase 3 clickable workflow prototype for the Dell IL Tech Leaders document verification reviewer workspace, built from the completed Phase 2 medium-fidelity static mockup.

The UI is implemented as a frontend-only Vite + React + TypeScript app at the repository root. Phase 1 workflow foundation notes live in `phase-1-workflow-foundation/`, the completed Phase 2 static mockup documentation lives in `phase-2-medium-fidelity-static-mockup/`, Phase 3 clickable prototype documentation lives in `phase-3-clickable-workflow-prototype/`, and Phase 4 UX hardening and LWC readiness planning lives in `phase-4-ux-hardening-lwc-readiness/`.

The current prototype is split into two pages: a summary page with the five verification groups, and a selected-group drilldown page with a clear back button to return to the summary. The drilldown supports document and uploaded-file tab selection, allowed document decisions, required inline reopen comments with simulated candidate notification feedback, required acceptance comments for `Doesn't exist` documents, sent-comment viewing for reopened documents, editable application fields, independent field confirmation checkboxes, and derived group/application progress.

## Prerequisites

- Node.js
- npm

## Run the UI Locally

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Vite will print a local URL in the terminal, usually `http://localhost:5173/`. Open that URL in a browser to view the Phase 3 clickable prototype.

## Build the UI

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Key Files

- `index.html`: Vite HTML entry point.
- `src/main.tsx`: React entry point.
- `src/App.tsx`: Stateful Phase 3 reviewer workspace prototype.
- `src/styles.css`: Lightning-inspired prototype styling and interaction states.
- `phase-1-workflow-foundation/README.md`: Phase 1 workflow foundation and information architecture.
- `phase-2-medium-fidelity-static-mockup/README.md`: Phase 2 context, deliverables, and implementation notes.
- `phase-3-clickable-workflow-prototype/README.md`: Phase 3 implementation notes, requirements, interaction model, state model, validation plan, and build checklist.
- `phase-4-ux-hardening-lwc-readiness/README.md`: Phase 4 review plan, density/accessibility checklist, LWC component inventory, and production-readiness questions.