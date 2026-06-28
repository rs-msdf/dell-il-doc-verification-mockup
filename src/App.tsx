import type { LucideIcon } from 'lucide-react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  EyeOff,
  FolderCheck,
  MailWarning,
  Maximize2,
  PencilLine,
  Upload,
  UserRound,
} from 'lucide-react';

type DocumentState = 'Verified' | 'Uploaded' | 'Not uploaded' | 'Reopened' | "Doesn't exist";

type GroupSummary = {
  name: string;
  documentsComplete: string;
  fieldsComplete: string;
  status: 'Complete' | 'Incomplete';
  blockers: number;
  selected?: boolean;
};

type DocumentItem = {
  name: string;
  state: DocumentState;
  files: number;
  comment: string;
  selected?: boolean;
};

type UploadedFile = {
  name: string;
  date: string;
  time: string;
  selected?: boolean;
};

type FieldItem = {
  label: string;
  value: string;
  checked: boolean;
  note: string;
  edited?: boolean;
};

const groupSummaries: GroupSummary[] = [
  {
    name: 'Applicant ID',
    documentsComplete: '1 of 3',
    fieldsComplete: '4 of 6',
    status: 'Incomplete',
    blockers: 4,
    selected: true,
  },
  {
    name: 'Parent 1 ID',
    documentsComplete: '3 of 3',
    fieldsComplete: '1 of 1',
    status: 'Complete',
    blockers: 0,
  },
  {
    name: 'Parent 2 ID',
    documentsComplete: '1 of 3',
    fieldsComplete: '1 of 1',
    status: 'Incomplete',
    blockers: 2,
  },
  {
    name: 'Applicant Income',
    documentsComplete: '0 of 2',
    fieldsComplete: '0 of 1',
    status: 'Incomplete',
    blockers: 3,
  },
  {
    name: 'Applicant Disability Status',
    documentsComplete: '1 of 1',
    fieldsComplete: '1 of 1',
    status: 'Complete',
    blockers: 0,
  },
];

const applicantDocuments: DocumentItem[] = [
  {
    name: 'ID',
    state: 'Verified',
    files: 1,
    comment: 'Clear scan of front ID.',
  },
  {
    name: 'Back of ID',
    state: 'Uploaded',
    files: 2,
    comment: 'I uploaded a clearer back-side image after the first scan was blurry.',
    selected: true,
  },
  {
    name: 'ID appendix',
    state: 'Not uploaded',
    files: 0,
    comment: 'I do not currently have an appendix document.',
  },
];

const uploadedFiles: UploadedFile[] = [
  {
    name: 'back-id-replacement-2026-06-24.pdf',
    date: '2026-06-24',
    time: '14:32',
    selected: true,
  },
  {
    name: 'back-id-initial-2026-06-15.pdf',
    date: '2026-06-15',
    time: '09:18',
  },
];

const applicantFields: FieldItem[] = [
  { label: 'First name', value: 'Dana', checked: true, note: 'Matches ID.' },
  { label: 'Last name', value: 'Levi', checked: true, note: 'Matches ID.' },
  { label: 'ID number', value: '031245678', checked: true, note: 'Matches ID.' },
  {
    label: 'Date of birth',
    value: '1999-04-18',
    checked: false,
    note: 'Needs confirmation against the selected evidence.',
  },
  {
    label: 'Marital status',
    value: 'Single',
    checked: false,
    note: 'Needs evidence review.',
  },
  {
    label: 'Number of children under 18',
    value: '0',
    checked: true,
    edited: true,
    note: 'Reviewer adjusted value after evidence review.',
  },
];

const stateIcons: Record<DocumentState, LucideIcon> = {
  Verified: CheckCircle2,
  Uploaded: Upload,
  'Not uploaded': AlertCircle,
  Reopened: MailWarning,
  "Doesn't exist": EyeOff,
};

const stateClassNames: Record<DocumentState, string> = {
  Verified: 'verified',
  Uploaded: 'uploaded',
  'Not uploaded': 'not-uploaded',
  Reopened: 'reopened',
  "Doesn't exist": 'doesnt-exist',
};

function StateBadge({ state }: { state: DocumentState }) {
  const Icon = stateIcons[state];

  return (
    <span className={`state-badge ${stateClassNames[state]}`}>
      <Icon aria-hidden="true" size={14} />
      {state}
    </span>
  );
}

function StatusPill({ status }: { status: 'Complete' | 'Incomplete' }) {
  const Icon = status === 'Complete' ? CheckCircle2 : AlertCircle;

  return (
    <span className={`status-pill ${status === 'Complete' ? 'complete' : 'incomplete'}`}>
      <Icon aria-hidden="true" size={14} />
      {status}
    </span>
  );
}

function DocumentTabStatus({ state }: { state: DocumentState }) {
  const isVerified = state === 'Verified';
  const Icon = isVerified ? CheckCircle2 : AlertCircle;

  return (
    <span className={`document-tab-status ${isVerified ? 'verified' : 'needs-review'}`}>
      <Icon aria-hidden="true" size={13} />
      {isVerified ? 'Verified' : 'Needs review'}
    </span>
  );
}

function App() {
  const selectedDocument = applicantDocuments.find((documentItem) => documentItem.selected) ?? applicantDocuments[0];

  return (
    <main className="workspace-shell">
      <section className="app-header" aria-labelledby="application-title">
        <div className="identity-block">
          <div className="avatar" aria-hidden="true">
            <UserRound size={22} />
          </div>
          <div>
            <p className="eyebrow">Verification workspace</p>
            <h1 id="application-title">Dana Levi</h1>
            <p className="subtle">Application APP-2026-0148 · Dell IL Tech Leaders</p>
          </div>
        </div>
        <div className="header-status" aria-label="Application verification status">
          <span className="progress-pill">2 of 5 groups complete</span>
          <span className="review-status">Verification in progress</span>
        </div>
      </section>

      <section className="group-overview" aria-labelledby="group-overview-title">
        <div className="group-overview-header">
          <div>
            <p className="eyebrow">Start here</p>
            <h2 id="group-overview-title">Document groups</h2>
            <p className="summary-copy">Choose a group to review. Each group opens into its own focused workspace.</p>
          </div>
          <span className="progress-pill">Applicant ID opened below</span>
        </div>

        <div className="group-card-grid" aria-label="Verification groups">
          {groupSummaries.map((groupSummary) => (
            <article className={`group-card ${groupSummary.selected ? 'selected' : ''}`} key={groupSummary.name}>
              <div className="group-card-header">
                <div className="group-card-title">
                  <FolderCheck aria-hidden="true" size={18} />
                  <h3>{groupSummary.name}</h3>
                </div>
                <StatusPill status={groupSummary.status} />
              </div>

              <div className="group-card-metrics">
                <div>
                  <span>Documents</span>
                  <strong>{groupSummary.documentsComplete}</strong>
                </div>
                <div>
                  <span>Fields</span>
                  <strong>{groupSummary.fieldsComplete}</strong>
                </div>
              </div>

              <div className={`group-card-blockers ${groupSummary.blockers > 0 ? 'needs-attention' : ''}`}>
                {groupSummary.blockers === 0 ? 'No blockers' : `${groupSummary.blockers} blockers`}
              </div>

              {groupSummary.selected ? <div className="group-card-action">Opened in workspace</div> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="entered-workspace" aria-label="Applicant ID workspace">
        <div className="workspace-breadcrumb" aria-label="Group workspace navigation">
          <div className="workspace-breadcrumb-path">
            <button className="back-link" type="button" disabled>
              <ArrowLeft aria-hidden="true" size={16} />
              All document groups
            </button>
            <span aria-hidden="true">/</span>
            <strong>Applicant ID</strong>
            <StatusPill status="Incomplete" />
          </div>
          <div className="summary-chips" aria-label="Selected group status">
            <span className="summary-chip attention">2 documents need verification</span>
            <span className="summary-chip attention">2 fields unchecked</span>
            <span className="summary-chip attention">4 blockers</span>
          </div>
        </div>

        <div className="workspace-content">
          <div className="workspace-review-grid">
            <section className="panel evidence-panel" aria-label="Document evidence">
              <div className="evidence-control-stack">
                <div className="evidence-document-row">
                  <div className="document-tabs" role="tablist" aria-label="Documents for Applicant ID">
                    {applicantDocuments.map((documentItem) => (
                      <button
                        className={`document-tab ${documentItem.selected ? 'selected' : ''}`}
                        type="button"
                        role="tab"
                        aria-selected={documentItem.selected ? 'true' : 'false'}
                        aria-disabled="true"
                        key={documentItem.name}
                      >
                        <span className="document-tab-copy">
                          <span className="document-tab-name">{documentItem.name}</span>
                          <DocumentTabStatus state={documentItem.state} />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="evidence-verification-row" aria-label="Back of ID verification controls">
                  <div className="selected-document-actions" aria-label="Back of ID decision controls">
                    <button className="static-button success" type="button" disabled>
                      <CheckCircle2 aria-hidden="true" size={16} />
                      Verify
                    </button>
                    <button className="static-button warning" type="button" disabled>
                      <MailWarning aria-hidden="true" size={16} />
                      Reopen
                    </button>
                  </div>
                  <div className="document-state-summary">
                    <StateBadge state={selectedDocument.state} />
                  </div>
                </div>

                <div className="evidence-file-row">
                  <div className="file-tabs" role="tablist" aria-label="Uploaded files for Back of ID">
                    {uploadedFiles.map((uploadedFile) => (
                      <button
                        className={`file-tab ${uploadedFile.selected ? 'selected' : ''}`}
                        type="button"
                        role="tab"
                        aria-selected={uploadedFile.selected ? 'true' : 'false'}
                        aria-disabled="true"
                        key={uploadedFile.name}
                      >
                        <time dateTime={`${uploadedFile.date}T${uploadedFile.time}:00`}>
                          <span>{uploadedFile.date}</span>
                          <span>{uploadedFile.time}</span>
                        </time>
                      </button>
                    ))}
                  </div>

                  <div className="preview-file-header">
                    <button className="static-button preview-fullscreen-button" type="button" aria-label="View full screen" disabled>
                      <Maximize2 aria-hidden="true" size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="document-preview" aria-label="Static document preview placeholder">
                <div className="preview-page-header">
                  <span>State of Israel</span>
                  <span>Identity document back side</span>
                </div>
                <div className="preview-line wide" />
                <div className="preview-line medium" />
                <div className="preview-block-grid">
                  <div className="preview-box" />
                  <div className="preview-box" />
                  <div className="preview-box" />
                </div>
                <div className="preview-line short" />
                <div className="preview-line medium" />
                <div className="preview-footer">Readable scan · candidate name visible · ID number visible</div>
              </div>

              <article className="evidence-review-footer" aria-label="Selected document review actions">
                {selectedDocument.comment ? (
                  <div className="applicant-comment">
                    <span>Applicant comment</span>
                    <p>{selectedDocument.comment}</p>
                  </div>
                ) : null}
              </article>
            </section>

            <section className="panel field-panel" aria-labelledby="fields-heading">
              <div className="section-title-row field-title-row">
                <PencilLine aria-hidden="true" size={18} />
                <div>
                  <h3 id="fields-heading">Field Verification</h3>
                  <p>Compare each submitted value against the open document.</p>
                </div>
              </div>

              <div className="field-list">
                {applicantFields.map((fieldItem) => (
                  <article className={`field-row ${fieldItem.checked ? 'checked' : 'unchecked'}`} key={fieldItem.label}>
                    <div className="field-label-block">
                      <h4>{fieldItem.label}</h4>
                      <p>{fieldItem.note}</p>
                    </div>
                    <div className={`static-input ${fieldItem.edited ? 'edited' : ''}`}>{fieldItem.value}</div>
                    <label className="checkbox-label">
                      <input type="checkbox" checked={fieldItem.checked} readOnly />
                      {fieldItem.checked ? 'Confirmed' : 'Confirm'}
                    </label>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;