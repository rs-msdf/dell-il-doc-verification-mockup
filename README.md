# Doc Verification Mockup

This repository contains the clickable workflow prototype for the Dell IL Tech Leaders document verification reviewer workspace.

The UI is implemented as a frontend-only Vite + React + TypeScript app at the repository root. The durable product requirements are consolidated in `requirements.md`, the product intent lives in `mission.md`, and implementation stack decisions live in `technology-decisions.md`.

The current prototype is split into two pages: a summary page with six verification tasks, and a selected-task drilldown page with a clear back button to return to the summary. The drilldown supports document and uploaded-file tab selection, a field-only override task with no attached documents, allowed document decisions, required inline reopen comments with simulated candidate notification feedback, required acceptance comments for missing-document verification from `Not uploaded` or `Doesn't exist`, sent-comment viewing for reopened documents, editable application fields, independent field confirmation checkboxes, last-school score override requirements, and derived task/application progress.

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

Vite will print a local URL in the terminal, usually `http://localhost:5173/`. Open that URL in a browser to view the clickable prototype.

## Build the UI

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Publish to GitHub Pages

This repository is configured to publish the Vite production build from `dist/` with GitHub Actions.

In GitHub, open the repository settings, go to **Pages**, and set **Source** to **GitHub Actions**. Then push to `master`, or run the **Deploy UI to GitHub Pages** workflow manually from the **Actions** tab.

The published UI will be available at:

```text
https://rs-msdf.github.io/dell-il-doc-verification-mockup/
```

For GitHub Pages, the workflow builds with Vite mode `github-pages`, which sets the app base path to `/dell-il-doc-verification-mockup/` so compiled assets load correctly from the project page URL.

## Key Files

- `index.html`: Vite HTML entry point.
- `src/main.tsx`: React entry point.
- `src/App.tsx`: Stateful reviewer workspace prototype.
- `src/styles.css`: Lightning-inspired prototype styling and interaction states.
- `requirements.md`: Consolidated product, interaction, state, completion, validation, accessibility, and production-question requirements.
- `mission.md`: Product mission and boundaries.
- `technology-decisions.md`: Mockup stack and sharing decisions.