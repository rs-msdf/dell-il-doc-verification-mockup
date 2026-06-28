# Doc Verification Mockup

This repository contains the Phase 2 medium-fidelity static UI mockup for the Dell IL Tech Leaders document verification reviewer workspace.

The UI is implemented as a Vite + React + TypeScript app at the repository root. The Phase 2 planning notes live in `phase-2-medium-fidelity-static-mockup/`.

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
- `phase-2-medium-fidelity-static-mockup/README.md`: Phase 2 context, deliverables, and implementation notes.