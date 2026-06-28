# Doc Verification Mockup

This repository contains the completed Phase 2 medium-fidelity static UI mockup for the Dell IL Tech Leaders document verification reviewer workspace.

The UI is implemented as a Vite + React + TypeScript app at the repository root. Phase 1 workflow foundation notes live in `phase-1-workflow-foundation/`, and the completed Phase 2 static mockup documentation lives in `phase-2-medium-fidelity-static-mockup/`.

The current static screen shows a group overview, an opened Applicant ID workspace, document-type tabs with verification indicators, timestamp-only uploaded-file tabs, a large document preview, a compact focused status row, and a right-side field verification rail.

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

Vite will print a local URL in the terminal, usually `http://localhost:5173/`. Open that URL in a browser to view the Phase 2 static mockup.

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
- `src/App.tsx`: Phase 2 reviewer workspace UI.
- `src/styles.css`: Medium-fidelity Lightning-inspired styling.
- `phase-1-workflow-foundation/README.md`: Phase 1 workflow foundation and information architecture.
- `phase-2-medium-fidelity-static-mockup/README.md`: Phase 2 context, deliverables, and implementation notes.