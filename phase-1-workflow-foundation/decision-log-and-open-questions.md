# Decision Log and Open Questions

This file records settled Phase 1 workflow decisions and questions to carry into Stage 2 and later prototype phases.

## Settled decisions

| Decision | Rationale |
| --- | --- |
| Phase 1 produces planning artifacts only. | The phase requirements explicitly exclude high-fidelity design, clickable interactions, and React/Vite implementation. |
| The primary workspace is grouped verification. | Grouped review keeps related documents and application fields together and reduces context switching. |
| The workspace is desktop-only. | Current requirements do not require mobile or responsive mobile layouts. |
| Document preview and field review are side by side. | Reviewers need to compare evidence and application values without moving across unrelated screens. |
| Top-level progress is group completion count only. | Requirements specify labels such as `3 of 5 groups complete`. |
| Completion requires both verified documents and checked fields. | A group can only complete when all group documents are `Verified` and all field checkboxes are checked. |
| Field editing and field verification are separate. | Editing a field value does not prove the reviewer completed verification. |
| Parent 1 ID and Parent 2 ID use the same field label. | This is intentional in the requirements and should not be deduplicated or reworded. |
| Uploaded files belong under a required document item. | A document item can have multiple submissions over time while keeping one document state. |
| Replacement uploads for reopened documents appear in the same file list. | A reopened document becomes review-ready again only after the applicant uploads a replacement file. |
| `Doesn't exist` documents show no preview. | Reviewer decisions for these items rely on applicant comments and surrounding group context. |
| Required reopen comments are represented in the Phase 1 blocker model. | Reopen comments are mandatory in the requirements, and their placement should be planned before interaction design. |

## Open questions and later-phase clarifications

| Question | Suggested Phase 1 position | Later-phase impact |
| --- | --- | --- |
| Do uploaded file entries need explicit labels for `initial upload`, `applicant replacement`, and `requested correction`, or is upload date/order enough? | Phase 2 uses timestamp-only tabs in the main comparison row and preserves labels in sample data. | Stage 3 can decide whether interactive file history needs visible labels. |
| Should required reopen comments appear in the Phase 1 blocker model, or only begin in the clickable prototype phase? | Include them in Phase 1 as a planned blocker category. | Stage 3 should enforce required comment validation. |
| Should group navigation show only complete/incomplete state, or also a count of blockers within each group? | Phase 2 shows complete/incomplete status and blocker counts in the group overview cards. | Stage 3 can validate whether these counts should remain interactive navigation metadata. |
| What exact applicant identity fields belong in the application header? | Use applicant name and application reference as the Phase 1 baseline. | Stage 2 sample data can add program/application metadata if useful. |
| How detailed should document preview placeholders be in the static mockup? | Phase 1 only needs preview region placement and no-preview rules. | Stage 2 should define realistic preview treatments for uploaded files and absent documents. |

## Stage 2 outcome notes

- The completed static mockup uses a group overview followed by an opened Applicant ID workspace.
- Representative states across groups remain covered by the UI plus Phase 2 sample data: complete, incomplete, reopened, uploaded, verified, not uploaded, and `Doesn't exist`.
- Applicant comments are shown in the selected document detail area and retained for every document in sample data.
- The Back of ID document shows multiple timestamp-only uploaded-file tabs.
- Field editing and field verification remain separate visual controls.
- Blocker categories are visible through focused status-row counts, document tab indicators/status chips, and unchecked field rows.
