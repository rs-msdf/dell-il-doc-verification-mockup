import { useEffect, useMemo, useRef, useState } from 'react';
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
type MissingDocumentReturnState = 'Not uploaded' | "Doesn't exist";
type GroupStatus = 'Complete' | 'Incomplete';
type FieldInputType = 'text' | 'number' | 'date' | 'select';
type FieldVerificationMode = 'checkbox' | 'value-presence' | 'display-only';

type UploadedFile = {
  id: string;
  filename: string;
  uploadLabel: 'Initial upload' | 'Applicant replacement' | 'Requested correction replacement';
  uploadedAt: string;
};

type ReviewerComment = {
  id: string;
  comment: string;
  createdAt: string;
};

type RequiredDocumentItem = {
  id: string;
  name: string;
  state: DocumentState;
  applicantComment: string;
  uploadedFiles: UploadedFile[];
  reviewerComments: ReviewerComment[];
  missingDocumentReturnState?: MissingDocumentReturnState;
  absenceAcceptanceComments?: ReviewerComment[];
};

type ApplicationField = {
  id: string;
  label: string;
  value: string;
  inputType: FieldInputType;
  checked: boolean;
  note: string;
  editedInSession: boolean;
  verificationMode?: FieldVerificationMode;
  readOnly?: boolean;
};

type VerificationGroup = {
  id: string;
  name: string;
  documents: RequiredDocumentItem[];
  fields: ApplicationField[];
  noDocumentsMessage?: string;
};

type ReopenDraft = {
  groupId: string;
  documentId: string;
  comment: string;
  touched: boolean;
};

type AbsenceAcceptanceDraft = {
  groupId: string;
  documentId: string;
  comment: string;
  touched: boolean;
};

type PrototypeNotification = {
  id: string;
  documentId: string;
  message: string;
  createdAt: string;
};

type GroupBlockers = {
  unverifiedDocuments: RequiredDocumentItem[];
  uncheckedFields: ApplicationField[];
  pendingReopenComment: boolean;
  pendingAbsenceAcceptanceComment: boolean;
};

const initialGroups: VerificationGroup[] = [
  {
    id: 'applicant-id',
    name: 'Applicant ID',
    documents: [
      {
        id: 'applicant-id-front',
        name: 'ID',
        state: 'Verified',
        applicantComment: 'Clear scan of front ID.',
        uploadedFiles: [
          {
            id: 'applicant-id-front-initial',
            filename: 'front-id-2026-06-15.pdf',
            uploadLabel: 'Initial upload',
            uploadedAt: '2026-06-15T09:12:00',
          },
        ],
        reviewerComments: [],
      },
      {
        id: 'applicant-id-back',
        name: 'Back of ID',
        state: 'Uploaded',
        applicantComment: 'I uploaded a clearer back-side image after the first scan was blurry.',
        uploadedFiles: [
          {
            id: 'applicant-id-back-replacement',
            filename: 'back-id-replacement-2026-06-24.pdf',
            uploadLabel: 'Applicant replacement',
            uploadedAt: '2026-06-24T14:32:00',
          },
          {
            id: 'applicant-id-back-initial',
            filename: 'back-id-initial-2026-06-15.pdf',
            uploadLabel: 'Initial upload',
            uploadedAt: '2026-06-15T09:18:00',
          },
        ],
        reviewerComments: [],
      },
      {
        id: 'applicant-id-appendix',
        name: 'ID appendix',
        state: 'Not uploaded',
        applicantComment: 'I do not currently have an appendix document.',
        uploadedFiles: [],
        reviewerComments: [],
      },
    ],
    fields: [
      { id: 'applicant-first-name', label: 'First name', value: 'Dana', inputType: 'text', checked: true, note: 'Matches ID.', editedInSession: false },
      { id: 'applicant-last-name', label: 'Last name', value: 'Levi', inputType: 'text', checked: true, note: 'Matches ID.', editedInSession: false },
      { id: 'applicant-id-number', label: 'ID number', value: '031245678', inputType: 'text', checked: true, note: 'Matches ID.', editedInSession: false },
      {
        id: 'applicant-date-of-birth',
        label: 'Date of birth',
        value: '1999-04-18',
        inputType: 'date',
        checked: false,
        note: 'Needs confirmation against the selected evidence.',
        editedInSession: false,
      },
      {
        id: 'applicant-marital-status',
        label: 'Marital status',
        value: 'Single',
        inputType: 'text',
        checked: false,
        note: 'Needs evidence review.',
        editedInSession: false,
      },
      {
        id: 'applicant-children-under-18',
        label: 'Number of children under 18',
        value: '0',
        inputType: 'number',
        checked: true,
        note: 'Reviewer adjusted value after evidence review.',
        editedInSession: true,
      },
    ],
  },
  {
    id: 'parent-1-id',
    name: 'Parent 1 ID',
    documents: [
      {
        id: 'parent-1-id-front',
        name: 'ID',
        state: 'Verified',
        applicantComment: 'Parent 1 front ID attached.',
        uploadedFiles: [
          {
            id: 'parent-1-id-front-initial',
            filename: 'parent-1-front-id-2026-06-16.pdf',
            uploadLabel: 'Initial upload',
            uploadedAt: '2026-06-16T10:05:00',
          },
        ],
        reviewerComments: [],
      },
      {
        id: 'parent-1-id-back',
        name: 'Back of ID',
        state: 'Verified',
        applicantComment: 'Parent 1 back ID attached.',
        uploadedFiles: [
          {
            id: 'parent-1-id-back-initial',
            filename: 'parent-1-back-id-2026-06-16.pdf',
            uploadLabel: 'Initial upload',
            uploadedAt: '2026-06-16T10:07:00',
          },
        ],
        reviewerComments: [],
      },
      {
        id: 'parent-1-id-appendix',
        name: 'ID appendix',
        state: 'Verified',
        applicantComment: 'Parent 1 does not have an appendix.',
        uploadedFiles: [],
        reviewerComments: [],
        missingDocumentReturnState: "Doesn't exist",
      },
    ],
    fields: [
      {
        id: 'parent-1-siblings-under-24',
        label: 'Number of siblings under 24 years of age',
        value: '2',
        inputType: 'number',
        checked: true,
        note: 'Confirmed against parent declaration.',
        editedInSession: false,
      },
    ],
  },
  {
    id: 'parent-2-id',
    name: 'Parent 2 ID',
    documents: [
      {
        id: 'parent-2-id-front',
        name: 'ID',
        state: 'Verified',
        applicantComment: 'Parent 2 front ID attached.',
        uploadedFiles: [
          {
            id: 'parent-2-id-front-initial',
            filename: 'parent-2-front-id-2026-06-18.pdf',
            uploadLabel: 'Initial upload',
            uploadedAt: '2026-06-18T08:44:00',
          },
        ],
        reviewerComments: [],
      },
      {
        id: 'parent-2-id-back',
        name: 'Back of ID',
        state: 'Reopened',
        applicantComment: 'Original upload was the wrong side.',
        uploadedFiles: [
          {
            id: 'parent-2-id-back-initial',
            filename: 'parent-2-front-duplicate-2026-06-18.pdf',
            uploadLabel: 'Initial upload',
            uploadedAt: '2026-06-18T08:49:00',
          },
        ],
        reviewerComments: [
          {
            id: 'parent-2-id-back-reopen-comment',
            comment: 'Please upload the back side of Parent 2 ID. The current file duplicates the front side.',
            createdAt: '2026-06-20T11:30:00',
          },
        ],
      },
      {
        id: 'parent-2-id-appendix',
        name: 'ID appendix',
        state: "Doesn't exist",
        applicantComment: 'Parent 2 has no appendix document.',
        uploadedFiles: [],
        reviewerComments: [],
        missingDocumentReturnState: "Doesn't exist",
      },
    ],
    fields: [
      {
        id: 'parent-2-siblings-under-24',
        label: 'Number of siblings under 24 years of age',
        value: '2',
        inputType: 'number',
        checked: true,
        note: 'Confirmed against parent declaration.',
        editedInSession: false,
      },
    ],
  },
  {
    id: 'applicant-income',
    name: 'Applicant Income',
    documents: [
      {
        id: 'applicant-2024-income',
        name: '2024 Income',
        state: 'Uploaded',
        applicantComment: 'Uploaded the annual income confirmation and a newer monthly statement.',
        uploadedFiles: [
          {
            id: 'applicant-2024-income-replacement',
            filename: 'applicant-2024-income-confirmation-updated.pdf',
            uploadLabel: 'Applicant replacement',
            uploadedAt: '2026-06-25T16:02:00',
          },
          {
            id: 'applicant-2024-income-initial',
            filename: 'applicant-2024-income-confirmation.pdf',
            uploadLabel: 'Initial upload',
            uploadedAt: '2026-06-12T13:41:00',
          },
        ],
        reviewerComments: [],
      },
      {
        id: 'applicant-2024-benefits',
        name: '2024 Benefits',
        state: 'Not uploaded',
        applicantComment: 'Waiting for National Insurance statement.',
        uploadedFiles: [],
        reviewerComments: [],
      },
    ],
    fields: [
      {
        id: 'applicant-total-monthly-income-gross',
        label: 'Total monthly income (gross)',
        value: '4,850 NIS/month',
        inputType: 'text',
        checked: false,
        note: 'Compare against the selected income and benefits evidence.',
        editedInSession: false,
      },
    ],
  },
  {
    id: 'parent-1-income',
    name: 'Parent 1 Income',
    documents: [
      {
        id: 'parent-1-2024-income',
        name: '2024 Income',
        state: 'Uploaded',
        applicantComment: 'Parent 1 income confirmation is attached.',
        uploadedFiles: [
          {
            id: 'parent-1-2024-income-initial',
            filename: 'parent-1-2024-income-confirmation.pdf',
            uploadLabel: 'Initial upload',
            uploadedAt: '2026-06-14T10:22:00',
          },
        ],
        reviewerComments: [],
      },
      {
        id: 'parent-1-2024-benefits',
        name: '2024 Benefits',
        state: 'Verified',
        applicantComment: 'Parent 1 benefits confirmation is attached.',
        uploadedFiles: [
          {
            id: 'parent-1-2024-benefits-initial',
            filename: 'parent-1-2024-benefits-confirmation.pdf',
            uploadLabel: 'Initial upload',
            uploadedAt: '2026-06-14T10:25:00',
          },
        ],
        reviewerComments: [],
      },
    ],
    fields: [
      {
        id: 'parent-1-total-monthly-income-gross',
        label: 'Total monthly income (gross)',
        value: '9,200 NIS/month',
        inputType: 'text',
        checked: false,
        note: 'Confirm against Parent 1 income and benefits evidence.',
        editedInSession: false,
      },
    ],
  },
  {
    id: 'parent-2-income',
    name: 'Parent 2 Income',
    documents: [
      {
        id: 'parent-2-2024-income',
        name: '2024 Income',
        state: 'Reopened',
        applicantComment: 'Parent 2 income file was uploaded from the employer portal.',
        uploadedFiles: [
          {
            id: 'parent-2-2024-income-initial',
            filename: 'parent-2-2024-income-summary.pdf',
            uploadLabel: 'Initial upload',
            uploadedAt: '2026-06-17T12:10:00',
          },
        ],
        reviewerComments: [
          {
            id: 'parent-2-income-reopen-comment',
            comment: 'Please upload the full 2024 income confirmation, not only the summary page.',
            createdAt: '2026-06-21T09:45:00',
          },
        ],
      },
      {
        id: 'parent-2-2024-benefits',
        name: '2024 Benefits',
        state: 'Uploaded',
        applicantComment: 'Parent 2 benefits confirmation attached.',
        uploadedFiles: [
          {
            id: 'parent-2-2024-benefits-initial',
            filename: 'parent-2-2024-benefits-confirmation.pdf',
            uploadLabel: 'Initial upload',
            uploadedAt: '2026-06-17T12:18:00',
          },
        ],
        reviewerComments: [],
      },
    ],
    fields: [
      {
        id: 'parent-2-total-monthly-income-gross',
        label: 'Total monthly income (gross)',
        value: '7,650 NIS/month',
        inputType: 'text',
        checked: false,
        note: 'Needs confirmation after corrected income evidence arrives.',
        editedInSession: false,
      },
    ],
  },
  {
    id: 'partner-income',
    name: 'Partner Income',
    documents: [
      {
        id: 'partner-2024-income',
        name: '2024 Income',
        state: 'Not uploaded',
        applicantComment: 'Applicant reported no partner income document is currently available.',
        uploadedFiles: [],
        reviewerComments: [],
      },
      {
        id: 'partner-2024-benefits',
        name: '2024 Benefits',
        state: 'Not uploaded',
        applicantComment: 'Applicant reported no partner benefits document is currently available.',
        uploadedFiles: [],
        reviewerComments: [],
      },
    ],
    fields: [
      {
        id: 'partner-total-monthly-income-gross',
        label: 'Total monthly income (gross)',
        value: '0 NIS/month',
        inputType: 'text',
        checked: false,
        note: 'Requires reviewer confirmation or accepted missing-document rationale.',
        editedInSession: false,
      },
    ],
  },
  {
    id: 'family-member-disability',
    name: 'Family Member Disability',
    documents: [
      {
        id: 'family-member-disability-certificate',
        name: 'Disability certificate',
        state: 'Verified',
        applicantComment: 'Certificate from the National Insurance Institute.',
        uploadedFiles: [
          {
            id: 'family-member-disability-certificate-initial',
            filename: 'family-member-disability-certificate-2026-06-13.pdf',
            uploadLabel: 'Initial upload',
            uploadedAt: '2026-06-13T15:26:00',
          },
        ],
        reviewerComments: [],
      },
    ],
    fields: [
      {
        id: 'family-member-disability-relation',
        label: 'Relation to applicant',
        value: 'Sibling',
        inputType: 'text',
        checked: true,
        note: 'Confirmed against certificate and application family details.',
        editedInSession: false,
      },
      {
        id: 'family-member-disability-percentage',
        label: 'Percent disability',
        value: '40%',
        inputType: 'text',
        checked: true,
        note: 'Confirmed against certificate.',
        editedInSession: false,
      },
    ],
  },
  {
    id: 'parent-1-estrangement',
    name: 'Parent 1 Estrangement',
    documents: [
      {
        id: 'parent-1-estrangement-attestation',
        name: 'Estrangement attestation',
        state: 'Uploaded',
        applicantComment: 'Attestation uploaded from the welfare office.',
        uploadedFiles: [
          {
            id: 'parent-1-estrangement-attestation-initial',
            filename: 'parent-1-estrangement-attestation.pdf',
            uploadLabel: 'Initial upload',
            uploadedAt: '2026-06-19T11:14:00',
          },
        ],
        reviewerComments: [],
      },
    ],
    fields: [
      {
        id: 'parent-1-status-estrangement',
        label: 'Parent 1 status',
        value: 'Estranged',
        inputType: 'text',
        checked: false,
        note: 'Validate status against the estrangement attestation.',
        editedInSession: false,
      },
    ],
  },
  {
    id: 'parent-2-estrangement',
    name: 'Parent 2 Estrangement',
    documents: [
      {
        id: 'parent-2-estrangement-attestation',
        name: 'Estrangement attestation',
        state: "Doesn't exist",
        applicantComment: 'Parent 2 estrangement does not apply.',
        uploadedFiles: [],
        reviewerComments: [],
        missingDocumentReturnState: "Doesn't exist",
      },
    ],
    fields: [
      {
        id: 'parent-2-status-estrangement',
        label: 'Parent 2 status',
        value: 'Not estranged',
        inputType: 'text',
        checked: false,
        note: 'Confirm the status or accept the missing attestation rationale.',
        editedInSession: false,
      },
    ],
  },
  {
    id: 'parent-1-death-certificate',
    name: 'Parent 1 Death Certificate',
    documents: [
      {
        id: 'parent-1-death-certificate-document',
        name: 'Death certificate',
        state: 'Not uploaded',
        applicantComment: 'Death certificate is not applicable for Parent 1.',
        uploadedFiles: [],
        reviewerComments: [],
      },
    ],
    fields: [
      {
        id: 'parent-1-status-death-certificate',
        label: 'Parent 1 status',
        value: 'Alive',
        inputType: 'text',
        checked: false,
        note: 'Confirm status or accept the missing-document rationale.',
        editedInSession: false,
      },
    ],
  },
  {
    id: 'parent-2-death-certificate',
    name: 'Parent 2 Death Certificate',
    documents: [
      {
        id: 'parent-2-death-certificate-document',
        name: 'Death certificate',
        state: 'Uploaded',
        applicantComment: 'Parent 2 death certificate attached.',
        uploadedFiles: [
          {
            id: 'parent-2-death-certificate-initial',
            filename: 'parent-2-death-certificate.pdf',
            uploadLabel: 'Initial upload',
            uploadedAt: '2026-06-22T08:36:00',
          },
        ],
        reviewerComments: [],
      },
    ],
    fields: [
      {
        id: 'parent-2-status-death-certificate',
        label: 'Parent 2 status',
        value: 'Deceased',
        inputType: 'text',
        checked: false,
        note: 'Validate status against the death certificate.',
        editedInSession: false,
      },
    ],
  },
  {
    id: 'address-during-last-school-year',
    name: 'Address during last school year',
    documents: [
      {
        id: 'last-school-year-address-list',
        name: 'List of addresses',
        state: 'Uploaded',
        applicantComment: 'Uploaded address history for the last school year.',
        uploadedFiles: [
          {
            id: 'last-school-year-address-list-initial',
            filename: 'last-school-year-address-list.pdf',
            uploadLabel: 'Initial upload',
            uploadedAt: '2026-06-23T13:18:00',
          },
        ],
        reviewerComments: [],
      },
    ],
    fields: [
      {
        id: 'last-school-year-full-address',
        label: 'Full address',
        value: '12 HaPalmach St, Beersheba',
        inputType: 'text',
        checked: true,
        note: 'Address from the submitted address list.',
        editedInSession: false,
        verificationMode: 'display-only',
        readOnly: true,
      },
      {
        id: 'last-school-year-longitude',
        label: 'Longitude',
        value: '34.7913',
        inputType: 'text',
        checked: true,
        note: 'Geocoded address coordinate.',
        editedInSession: false,
        verificationMode: 'display-only',
        readOnly: true,
      },
      {
        id: 'last-school-year-latitude',
        label: 'Latitude',
        value: '31.2518',
        inputType: 'text',
        checked: true,
        note: 'Geocoded address coordinate.',
        editedInSession: false,
        verificationMode: 'display-only',
        readOnly: true,
      },
      {
        id: 'last-school-year-statistical-area',
        label: 'Statistical area',
        value: '62610234',
        inputType: 'text',
        checked: true,
        note: 'Matched statistical area for the school-year address.',
        editedInSession: false,
        verificationMode: 'display-only',
        readOnly: true,
      },
      {
        id: 'last-school-year-socio-economic-index',
        label: 'Socio economic index',
        value: '4',
        inputType: 'text',
        checked: true,
        note: 'Official socio economic index for the matched area.',
        editedInSession: false,
        verificationMode: 'display-only',
        readOnly: true,
      },
      {
        id: 'last-school-year-socio-economic-index-comments',
        label: 'Socio economic index comments',
        value: 'Matched by last known residence during the school year.',
        inputType: 'text',
        checked: true,
        note: 'Context from the score lookup.',
        editedInSession: false,
        verificationMode: 'display-only',
        readOnly: true,
      },
      {
        id: 'last-school-year-address-score',
        label: 'Address score',
        value: '',
        inputType: 'text',
        checked: true,
        note: 'Official address score is blank.',
        editedInSession: false,
        verificationMode: 'display-only',
        readOnly: true,
      },
      {
        id: 'last-school-year-address-score-override',
        label: 'Address score override',
        value: '',
        inputType: 'text',
        checked: false,
        note: 'Required because the official address score is blank.',
        editedInSession: false,
        verificationMode: 'value-presence',
      },
    ],
  },
  {
    id: 'last-school-score-override',
    name: 'Last school score',
    documents: [],
    noDocumentsMessage: 'Documents not required for this verification task',
    fields: [
      {
        id: 'override-last-school-name-district',
        label: 'Last school name and district',
        value: 'Makif Alef, Beersheba District',
        inputType: 'text',
        checked: true,
        note: 'Submitted school context.',
        editedInSession: false,
        verificationMode: 'display-only',
        readOnly: true,
      },
      {
        id: 'override-last-school-in-israel',
        label: 'Last school was in Israel',
        value: 'Yes',
        inputType: 'text',
        checked: true,
        note: 'Submitted school context.',
        editedInSession: false,
        verificationMode: 'display-only',
        readOnly: true,
      },
      {
        id: 'override-last-school-attendance-year',
        label: 'Last year of attendance',
        value: '2024',
        inputType: 'text',
        checked: true,
        note: 'Submitted school context.',
        editedInSession: false,
        verificationMode: 'display-only',
        readOnly: true,
      },
      {
        id: 'override-last-school-grade-studied',
        label: 'Last grade studied',
        value: '11',
        inputType: 'text',
        checked: true,
        note: 'Submitted school context.',
        editedInSession: false,
        verificationMode: 'display-only',
        readOnly: true,
      },
      {
        id: 'override-last-school-decile',
        label: 'School decile',
        value: '',
        inputType: 'text',
        checked: true,
        note: 'Official school score data is blank.',
        editedInSession: false,
        verificationMode: 'display-only',
        readOnly: true,
      },
      {
        id: 'override-last-school-decile-score',
        label: 'School decile score',
        value: '',
        inputType: 'text',
        checked: true,
        note: 'Official school score data is blank.',
        editedInSession: false,
        verificationMode: 'display-only',
        readOnly: true,
      },
      {
        id: 'override-last-school-score',
        label: 'Override last school score',
        value: '',
        inputType: 'text',
        checked: false,
        note: 'Required because official decile and score are blank.',
        editedInSession: false,
        verificationMode: 'value-presence',
      },
    ],
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

const attentionOrder: DocumentState[] = ['Uploaded', "Doesn't exist", 'Not uploaded', 'Reopened', 'Verified'];

function documentIsComplete(documentItem: RequiredDocumentItem) {
  return documentItem.state === 'Verified';
}

function fieldIsComplete(field: ApplicationField) {
  if (field.verificationMode === 'display-only') {
    return true;
  }

  if (field.verificationMode === 'value-presence') {
    return field.value.trim().length > 0;
  }

  return field.checked;
}

function groupIsComplete(group: VerificationGroup) {
  return group.documents.every(documentIsComplete) && group.fields.every(fieldIsComplete);
}

function getGroupBlockers(
  group: VerificationGroup,
  activeReopenDraft: ReopenDraft | null,
  activeAbsenceAcceptanceDraft: AbsenceAcceptanceDraft | null,
): GroupBlockers {
  return {
    unverifiedDocuments: group.documents.filter((documentItem) => !documentIsComplete(documentItem)),
    uncheckedFields: group.fields.filter((field) => !fieldIsComplete(field)),
    pendingReopenComment:
      activeReopenDraft?.groupId === group.id && activeReopenDraft.comment.trim().length === 0,
    pendingAbsenceAcceptanceComment:
      activeAbsenceAcceptanceDraft?.groupId === group.id && activeAbsenceAcceptanceDraft.comment.trim().length === 0,
  };
}

function getBlockerCount(blockers: GroupBlockers) {
  return (
    blockers.unverifiedDocuments.length +
    blockers.uncheckedFields.length +
    (blockers.pendingReopenComment ? 1 : 0) +
    (blockers.pendingAbsenceAcceptanceComment ? 1 : 0)
  );
}

function getGroupStatus(group: VerificationGroup): GroupStatus {
  return groupIsComplete(group) ? 'Complete' : 'Incomplete';
}

function getDefaultDocumentId(group: VerificationGroup) {
  if (group.documents.length === 0) {
    return '';
  }

  return (
    attentionOrder
      .map((state) => group.documents.find((documentItem) => documentItem.state === state))
      .find(Boolean)?.id ?? group.documents[0].id
  );
}

function getLatestFileId(documentItem: RequiredDocumentItem) {
  return documentItem.uploadedFiles[0]?.id ?? '';
}

function createInitialSelectedDocuments(groups: VerificationGroup[]) {
  return Object.fromEntries(groups.map((group) => [group.id, getDefaultDocumentId(group)]));
}

function createInitialSelectedFiles(groups: VerificationGroup[]) {
  return Object.fromEntries(
    groups.flatMap((group) =>
      group.documents.map((documentItem) => [documentItem.id, getLatestFileId(documentItem)]),
    ),
  );
}

function getDisplayDateTime(uploadedAt: string) {
  const [date, timeWithSeconds] = uploadedAt.split('T');
  return { date, time: timeWithSeconds.slice(0, 5) };
}

function getAvailableActions(documentItem: RequiredDocumentItem) {
  return {
    canVerify:
      documentItem.state === 'Uploaded' ||
      documentItem.state === 'Reopened' ||
      documentItem.state === "Doesn't exist" ||
      documentItem.state === 'Not uploaded',
    canUnverify: documentItem.state === 'Verified',
    canReopen: documentItem.state === 'Uploaded' || documentItem.state === 'Verified' || documentItem.state === "Doesn't exist",
    canViewSentComment: documentItem.state === 'Reopened' && documentItem.reviewerComments.length > 0,
  };
}

function getUnverifiedDocumentState(documentItem: RequiredDocumentItem): Exclude<DocumentState, 'Verified' | 'Reopened'> {
  return documentItem.uploadedFiles.length > 0 ? 'Uploaded' : documentItem.missingDocumentReturnState ?? 'Not uploaded';
}

function formatTimestamp(timestamp: string) {
  const { date, time } = getDisplayDateTime(timestamp);
  return `${date} ${time}`;
}

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
  const [groups, setGroups] = useState<VerificationGroup[]>(initialGroups);
  const [currentPage, setCurrentPage] = useState<'summary' | 'drilldown'>('summary');
  const [selectedGroupId, setSelectedGroupId] = useState(initialGroups[0].id);
  const [selectedDocumentIdByGroup, setSelectedDocumentIdByGroup] = useState<Record<string, string>>(() =>
    createInitialSelectedDocuments(initialGroups),
  );
  const [selectedFileIdByDocument, setSelectedFileIdByDocument] = useState<Record<string, string>>(() =>
    createInitialSelectedFiles(initialGroups),
  );
  const [activeReopenDraft, setActiveReopenDraft] = useState<ReopenDraft | null>(null);
  const [activeAbsenceAcceptanceDraft, setActiveAbsenceAcceptanceDraft] = useState<AbsenceAcceptanceDraft | null>(null);
  const [visibleSentCommentDocumentId, setVisibleSentCommentDocumentId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<PrototypeNotification[]>([]);
  const reopenCommentRef = useRef<HTMLTextAreaElement | null>(null);

  const selectedGroup = groups.find((group) => group.id === selectedGroupId) ?? groups[0];
  const selectedDocumentId = selectedDocumentIdByGroup[selectedGroup.id] ?? getDefaultDocumentId(selectedGroup);
  const selectedDocument =
    selectedGroup.documents.find((documentItem) => documentItem.id === selectedDocumentId) ?? selectedGroup.documents[0];
  const hasSelectedDocument = Boolean(selectedDocument);
  const selectedFileId = selectedDocument ? selectedFileIdByDocument[selectedDocument.id] ?? getLatestFileId(selectedDocument) : '';
  const selectedFile = selectedDocument?.uploadedFiles.find((uploadedFile) => uploadedFile.id === selectedFileId);
  const selectedGroupBlockers = getGroupBlockers(selectedGroup, activeReopenDraft, activeAbsenceAcceptanceDraft);
  const selectedGroupBlockerCount = getBlockerCount(selectedGroupBlockers);
  const completedGroupCount = groups.filter(groupIsComplete).length;
  const selectedDocumentActions = selectedDocument
    ? getAvailableActions(selectedDocument)
    : { canVerify: false, canUnverify: false, canReopen: false, canViewSentComment: false };
  const latestReviewerComment = selectedDocument?.reviewerComments[0];
  const sentCommentIsVisible = selectedDocument ? visibleSentCommentDocumentId === selectedDocument.id : false;
  const activeDraftMatchesSelection =
    selectedDocument ? activeReopenDraft?.groupId === selectedGroup.id && activeReopenDraft.documentId === selectedDocument.id : false;
  const activeDraftIsInvalid = Boolean(activeDraftMatchesSelection && activeReopenDraft?.comment.trim().length === 0);
  const activeAcceptanceDraftMatchesSelection =
    selectedDocument ? activeAbsenceAcceptanceDraft?.groupId === selectedGroup.id &&
    activeAbsenceAcceptanceDraft.documentId === selectedDocument.id : false;
  const activeAcceptanceDraftIsInvalid = Boolean(
    activeAcceptanceDraftMatchesSelection && activeAbsenceAcceptanceDraft?.comment.trim().length === 0,
  );
  const selectedDocumentNotifications = notifications.filter(
    (notification) => selectedDocument ? notification.documentId === selectedDocument.id : false,
  );

  useEffect(() => {
    if (activeDraftMatchesSelection || activeAcceptanceDraftMatchesSelection) {
      reopenCommentRef.current?.focus();
    }
  }, [activeDraftMatchesSelection, activeAcceptanceDraftMatchesSelection]);

  function handleSelectGroup(group: VerificationGroup) {
    setSelectedGroupId(group.id);
    setSelectedDocumentIdByGroup((currentSelections) => ({
      ...currentSelections,
      [group.id]: currentSelections[group.id] ?? getDefaultDocumentId(group),
    }));
    setCurrentPage('drilldown');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleBackToSummary() {
    setCurrentPage('summary');
    setActiveReopenDraft(null);
    setActiveAbsenceAcceptanceDraft(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSelectDocument(documentItem: RequiredDocumentItem) {
    setSelectedDocumentIdByGroup((currentSelections) => ({
      ...currentSelections,
      [selectedGroup.id]: documentItem.id,
    }));
    setSelectedFileIdByDocument((currentSelections) => ({
      ...currentSelections,
      [documentItem.id]: currentSelections[documentItem.id] || getLatestFileId(documentItem),
    }));
  }

  function updateSelectedDocument(updatedDocument: RequiredDocumentItem) {
    if (!selectedDocument) {
      return;
    }

    setGroups((currentGroups) =>
      currentGroups.map((group) =>
        group.id === selectedGroup.id
          ? {
              ...group,
              documents: group.documents.map((documentItem) =>
                documentItem.id === updatedDocument.id ? updatedDocument : documentItem,
              ),
            }
          : group,
      ),
    );
  }

  function handleVerifyDocument() {
    if (!selectedDocument || !selectedDocumentActions.canVerify) {
      return;
    }

    if (selectedDocument.state === "Doesn't exist" || selectedDocument.state === 'Not uploaded') {
      setActiveReopenDraft(null);
      setActiveAbsenceAcceptanceDraft({
        groupId: selectedGroup.id,
        documentId: selectedDocument.id,
        comment: '',
        touched: false,
      });
      return;
    }

    updateSelectedDocument({ ...selectedDocument, state: 'Verified' });
    setVisibleSentCommentDocumentId(null);
    setActiveAbsenceAcceptanceDraft((currentDraft) =>
      currentDraft?.documentId === selectedDocument.id ? null : currentDraft,
    );
    setActiveReopenDraft((currentDraft) =>
      currentDraft?.documentId === selectedDocument.id ? null : currentDraft,
    );
  }

  function handleUnverifyDocument() {
    if (!selectedDocument || !selectedDocumentActions.canUnverify) {
      return;
    }

    updateSelectedDocument({ ...selectedDocument, state: getUnverifiedDocumentState(selectedDocument) });
    setVisibleSentCommentDocumentId(null);
    setActiveAbsenceAcceptanceDraft((currentDraft) =>
      currentDraft?.documentId === selectedDocument.id ? null : currentDraft,
    );
    setActiveReopenDraft((currentDraft) =>
      currentDraft?.documentId === selectedDocument.id ? null : currentDraft,
    );
  }

  function handleStartReopen() {
    if (!selectedDocument || !selectedDocumentActions.canReopen) {
      return;
    }

    setActiveAbsenceAcceptanceDraft(null);
    setActiveReopenDraft({
      groupId: selectedGroup.id,
      documentId: selectedDocument.id,
      comment: '',
      touched: false,
    });
  }

  function handleCancelReopen() {
    setActiveReopenDraft(null);
  }

  function handleCancelAbsenceAcceptance() {
    setActiveAbsenceAcceptanceDraft(null);
  }

  function handleSubmitReopen() {
    if (!activeReopenDraft || !activeDraftMatchesSelection || activeReopenDraft.comment.trim().length === 0) {
      setActiveReopenDraft((currentDraft) => (currentDraft ? { ...currentDraft, touched: true } : currentDraft));
      return;
    }

    const createdAt = new Date().toISOString();
    const reviewerComment: ReviewerComment = {
      id: `${selectedDocument.id}-reviewer-comment-${Date.now()}`,
      comment: activeReopenDraft.comment.trim(),
      createdAt,
    };
    const notification: PrototypeNotification = {
      id: `${selectedDocument.id}-notification-${Date.now()}`,
      documentId: selectedDocument.id,
      message: 'Correction request queued for candidate',
      createdAt,
    };

    updateSelectedDocument({
      ...selectedDocument,
      state: 'Reopened',
      reviewerComments: [reviewerComment, ...selectedDocument.reviewerComments],
    });
    setNotifications((currentNotifications) => [notification, ...currentNotifications]);
    setActiveReopenDraft(null);
    setVisibleSentCommentDocumentId(selectedDocument.id);
  }

  function handleToggleSentComment() {
    if (!selectedDocument) {
      return;
    }

    setVisibleSentCommentDocumentId((currentDocumentId) =>
      currentDocumentId === selectedDocument.id ? null : selectedDocument.id,
    );
  }

  function handleAbsenceAcceptanceDraftChange(comment: string) {
    setActiveAbsenceAcceptanceDraft((currentDraft) =>
      currentDraft && activeAcceptanceDraftMatchesSelection ? { ...currentDraft, comment } : currentDraft,
    );
  }

  function handleSubmitAbsenceAcceptance() {
    if (
      !activeAbsenceAcceptanceDraft ||
      !activeAcceptanceDraftMatchesSelection ||
      activeAbsenceAcceptanceDraft.comment.trim().length === 0
    ) {
      setActiveAbsenceAcceptanceDraft((currentDraft) =>
        currentDraft ? { ...currentDraft, touched: true } : currentDraft,
      );
      return;
    }

    const acceptanceComment: ReviewerComment = {
      id: `${selectedDocument.id}-absence-acceptance-${Date.now()}`,
      comment: activeAbsenceAcceptanceDraft.comment.trim(),
      createdAt: new Date().toISOString(),
    };

    updateSelectedDocument({
      ...selectedDocument,
      state: 'Verified',
      missingDocumentReturnState: selectedDocument.state === "Doesn't exist" ? "Doesn't exist" : 'Not uploaded',
      absenceAcceptanceComments: [
        acceptanceComment,
        ...(selectedDocument.absenceAcceptanceComments ?? []),
      ],
    });
    setActiveAbsenceAcceptanceDraft(null);
  }

  function handleReopenDraftChange(comment: string) {
    setActiveReopenDraft((currentDraft) =>
      currentDraft && activeDraftMatchesSelection ? { ...currentDraft, comment } : currentDraft,
    );
  }

  function handleFieldValueChange(fieldId: string, value: string) {
    setGroups((currentGroups) =>
      currentGroups.map((group) =>
        group.id === selectedGroup.id
          ? {
              ...group,
              fields: group.fields.map((field) =>
                field.id === fieldId ? { ...field, value, editedInSession: true } : field,
              ),
            }
          : group,
      ),
    );
  }

  function handleFieldCheckedChange(fieldId: string, checked: boolean) {
    setGroups((currentGroups) =>
      currentGroups.map((group) =>
        group.id === selectedGroup.id
          ? {
              ...group,
              fields: group.fields.map((field) => (field.id === fieldId ? { ...field, checked } : field)),
            }
          : group,
      ),
    );
  }

  const selectedGroupChips = useMemo(() => {
    const documentChip = selectedGroup.documents.length === 0
      ? selectedGroup.noDocumentsMessage ?? 'No documents attached'
      : selectedGroupBlockers.unverifiedDocuments.length > 0
        ? `${selectedGroupBlockers.unverifiedDocuments.length} documents need verification`
        : 'All documents verified';
    const fieldChip = selectedGroupBlockers.uncheckedFields.length > 0
      ? `${selectedGroupBlockers.uncheckedFields.length} fields need review`
      : 'Field requirements complete';

    if (selectedGroupBlockerCount === 0) {
      return [documentChip, fieldChip];
    }

    return [
      documentChip,
      fieldChip,
      ...(selectedGroupBlockers.pendingReopenComment ? ['Reopen comment required'] : []),
      ...(selectedGroupBlockers.pendingAbsenceAcceptanceComment ? ['Acceptance comment required'] : []),
      `${selectedGroupBlockerCount} blockers`,
    ];
  }, [selectedGroupBlockerCount, selectedGroupBlockers]);

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
          <span className="progress-pill">
            {completedGroupCount} of {groups.length} tasks complete
          </span>
        </div>
      </section>

      {currentPage === 'summary' ? <section className="group-overview" aria-labelledby="group-overview-title">
        <div className="group-overview-header">
          <div>
            <p className="eyebrow">Start here</p>
            <h2 id="group-overview-title">Verification Tasks</h2>
            <p className="summary-copy">Choose one task to open its dedicated review workspace.</p>
          </div>
        </div>

        <div className="group-card-grid" aria-label="Verification tasks">
          {groups.map((group) => {
            const documentsComplete = group.documents.filter(documentIsComplete).length;
            const fieldsComplete = group.fields.filter(fieldIsComplete).length;
            const status = getGroupStatus(group);
            const documentsMissing = group.documents.length - documentsComplete;
            const fieldsMissing = group.fields.length - fieldsComplete;
            const missingSummary = [
              documentsMissing > 0
                ? `${documentsMissing} ${documentsMissing === 1 ? 'document needs' : 'documents need'} review`
                : group.documents.length === 0
                  ? group.noDocumentsMessage ?? 'No documents attached'
                : null,
              fieldsMissing > 0 ? `${fieldsMissing} ${fieldsMissing === 1 ? 'field needs' : 'fields need'} review` : null,
            ].filter(Boolean).join(' · ');

            return (
            <button
              className="group-card"
              type="button"
              onClick={() => handleSelectGroup(group)}
              key={group.id}
            >
              <div className="group-card-header">
                <div className="group-card-title">
                  <FolderCheck aria-hidden="true" size={18} />
                  <h3>{group.name}</h3>
                </div>
                <StatusPill status={status} />
              </div>

              <div className="group-card-metrics">
                <div>
                  <span>Documents</span>
                  <strong>
                    {documentsComplete} of {group.documents.length}
                  </strong>
                </div>
                <div>
                  <span>Fields</span>
                  <strong>
                    {fieldsComplete} of {group.fields.length}
                  </strong>
                </div>
              </div>

              <div className={`group-card-blockers ${missingSummary ? 'needs-attention' : ''}`}>
                {missingSummary || (group.documents.length === 0 ? `${group.noDocumentsMessage ?? 'No documents attached'} · score fields complete` : 'All documents verified · all fields confirmed')}
              </div>

              <div className="group-card-action">Open task</div>
            </button>
            );
          })}
        </div>
      </section> : null}

      {currentPage === 'drilldown' ? <section className="entered-workspace" aria-label={`${selectedGroup.name} workspace`}>
        <div className="workspace-breadcrumb" aria-label="Task workspace navigation">
          <div className="workspace-breadcrumb-path">
            <button className="back-link" type="button" onClick={handleBackToSummary}>
              <ArrowLeft aria-hidden="true" size={16} />
              Back to all verification tasks
            </button>
            <span aria-hidden="true">/</span>
            <strong>{selectedGroup.name}</strong>
            <StatusPill status={getGroupStatus(selectedGroup)} />
          </div>
          <div className="summary-chips" aria-label="Selected task status">
            {selectedGroupChips.map((chip) => (
              <span className={`summary-chip ${selectedGroupBlockerCount > 0 ? 'attention' : 'complete'}`} key={chip}>
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="workspace-content">
          <div className="workspace-review-grid">
            <section className="panel evidence-panel" aria-label="Document evidence">
              <div className="evidence-control-stack">
                <div className="evidence-document-row">
                  <div className="document-tabs" role="tablist" aria-label={`Documents for ${selectedGroup.name}`}>
                    {selectedGroup.documents.length > 0 ? selectedGroup.documents.map((documentItem) => {
                      const isSelected = documentItem.id === selectedDocument.id;

                      return (
                      <button
                        className={`document-tab ${isSelected ? 'selected' : ''}`}
                        type="button"
                        role="tab"
                        aria-selected={isSelected ? 'true' : 'false'}
                        onClick={() => handleSelectDocument(documentItem)}
                        key={documentItem.id}
                      >
                        <span className="document-tab-copy">
                          <span className="document-tab-name">{documentItem.name}</span>
                          <DocumentTabStatus state={documentItem.state} />
                        </span>
                      </button>
                      );
                    }) : <span className="no-documents-chip">{selectedGroup.noDocumentsMessage ?? 'No attached documents'}</span>}
                  </div>
                </div>

                {hasSelectedDocument ? <div className="evidence-verification-row" aria-label={`${selectedDocument.name} verification controls`}>
                  <div className="document-action-stack">
                    <div className="selected-document-actions" aria-label={`${selectedDocument.name} decision controls`}>
                      {selectedDocumentActions.canVerify ? (
                        <button className="static-button success" type="button" onClick={handleVerifyDocument}>
                          <CheckCircle2 aria-hidden="true" size={16} />
                          Verify
                        </button>
                      ) : null}
                      {selectedDocumentActions.canUnverify ? (
                        <button className="static-button" type="button" onClick={handleUnverifyDocument}>
                          <Upload aria-hidden="true" size={16} />
                          Unverify
                        </button>
                      ) : null}
                      {selectedDocumentActions.canReopen ? (
                        <button className="static-button warning" type="button" onClick={handleStartReopen}>
                          <MailWarning aria-hidden="true" size={16} />
                          Reopen
                        </button>
                      ) : null}
                      {selectedDocumentActions.canViewSentComment ? (
                        <button className="static-button" type="button" onClick={handleToggleSentComment}>
                          <MailWarning aria-hidden="true" size={16} />
                          {sentCommentIsVisible ? 'Hide sent comment' : 'View sent comment'}
                        </button>
                      ) : null}
                      {!selectedDocumentActions.canVerify && !selectedDocumentActions.canReopen ? (
                        <span className="waiting-copy">
                          {selectedDocument.state === 'Reopened'
                            ? 'Waiting for applicant correction'
                            : 'Waiting for applicant upload'}
                        </span>
                      ) : null}
                    </div>

                    {activeDraftMatchesSelection ? (
                      <div className="reopen-draft-panel">
                        <label className="static-textarea-label" htmlFor="reopen-comment">
                          Correction request comment
                        </label>
                        <textarea
                          className={`static-textarea ${activeDraftIsInvalid && activeReopenDraft?.touched ? 'invalid' : ''}`}
                          id="reopen-comment"
                          ref={reopenCommentRef}
                          value={activeReopenDraft?.comment ?? ''}
                          onBlur={() => setActiveReopenDraft((currentDraft) => currentDraft ? { ...currentDraft, touched: true } : currentDraft)}
                          onChange={(event) => handleReopenDraftChange(event.target.value)}
                          placeholder="Describe what the candidate needs to correct."
                        />
                        {activeDraftIsInvalid && activeReopenDraft?.touched ? (
                          <p className="validation-copy">Enter a comment before sending the correction request.</p>
                        ) : null}
                        <div className="reopen-draft-actions">
                          <button className="static-button warning" type="button" disabled={activeDraftIsInvalid} onClick={handleSubmitReopen}>
                            Send correction request
                          </button>
                          <button className="static-button" type="button" onClick={handleCancelReopen}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {activeAcceptanceDraftMatchesSelection ? (
                      <div className="reopen-draft-panel absence-acceptance-panel">
                        <label className="static-textarea-label" htmlFor="absence-acceptance-comment">
                          Why is it ok not to upload this document?
                        </label>
                        <textarea
                          className={`static-textarea ${activeAcceptanceDraftIsInvalid && activeAbsenceAcceptanceDraft?.touched ? 'invalid' : ''}`}
                          id="absence-acceptance-comment"
                          ref={reopenCommentRef}
                          value={activeAbsenceAcceptanceDraft?.comment ?? ''}
                          onBlur={() => setActiveAbsenceAcceptanceDraft((currentDraft) => currentDraft ? { ...currentDraft, touched: true } : currentDraft)}
                          onChange={(event) => handleAbsenceAcceptanceDraftChange(event.target.value)}
                          placeholder="Explain why the absence is acceptable for this application."
                        />
                        {activeAcceptanceDraftIsInvalid && activeAbsenceAcceptanceDraft?.touched ? (
                          <p className="validation-copy">Enter a comment before accepting the missing document.</p>
                        ) : null}
                        <div className="reopen-draft-actions">
                          <button className="static-button success" type="button" disabled={activeAcceptanceDraftIsInvalid} onClick={handleSubmitAbsenceAcceptance}>
                            Accept without upload
                          </button>
                          <button className="static-button" type="button" onClick={handleCancelAbsenceAcceptance}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {selectedDocumentActions.canViewSentComment && sentCommentIsVisible && latestReviewerComment ? (
                      <div className="sent-comment-panel">
                        <span>Sent correction comment</span>
                        <p>{latestReviewerComment.comment}</p>
                        <time dateTime={latestReviewerComment.createdAt}>{formatTimestamp(latestReviewerComment.createdAt)}</time>
                      </div>
                    ) : null}
                  </div>
                  <div className="document-state-summary">
                    <StateBadge state={selectedDocument.state} />
                  </div>
                </div> : null}

                <div className="evidence-file-row">
                  <div className="file-tabs" role="tablist" aria-label={selectedDocument ? `Uploaded files for ${selectedDocument.name}` : `Uploaded files for ${selectedGroup.name}`}>
                    {selectedDocument && selectedDocument.uploadedFiles.length > 0 ? selectedDocument.uploadedFiles.map((uploadedFile) => {
                      const displayDateTime = getDisplayDateTime(uploadedFile.uploadedAt);
                      const isSelected = uploadedFile.id === selectedFileId;

                      return (
                      <button
                        className={`file-tab ${isSelected ? 'selected' : ''}`}
                        type="button"
                        role="tab"
                        aria-selected={isSelected ? 'true' : 'false'}
                        onClick={() =>
                          setSelectedFileIdByDocument((currentSelections) => ({
                            ...currentSelections,
                            [selectedDocument.id]: uploadedFile.id,
                          }))
                        }
                        key={uploadedFile.id}
                      >
                        <time dateTime={uploadedFile.uploadedAt}>
                          <span>{displayDateTime.date}</span>
                          <span>{displayDateTime.time}</span>
                        </time>
                      </button>
                      );
                    }) : <span className="no-files-chip">No uploaded files</span>}
                  </div>

                  <div className="preview-file-header">
                    <button className="static-button preview-fullscreen-button" type="button" aria-label="View full screen" disabled={!selectedFile}>
                      <Maximize2 aria-hidden="true" size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className={`document-preview ${selectedFile ? '' : 'no-preview'}`} aria-label="Document preview placeholder">
                {selectedFile ? (
                  <>
                    <div className="preview-page-header">
                      <span>{selectedGroup.name}</span>
                      <span>{selectedFile.uploadLabel}</span>
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
                    <div className="preview-footer">
                      <span>{selectedFile.filename}</span>
                      <span>{formatTimestamp(selectedFile.uploadedAt)}</span>
                    </div>
                  </>
                ) : (
                  <div className="no-preview-message">
                    <EyeOff aria-hidden="true" size={28} />
                    <h3>No preview available</h3>
                    <p>
                      {!selectedDocument
                        ? `${selectedGroup.noDocumentsMessage ?? 'This verification task has no attached documents'}. Review the fields for completion.`
                        : selectedDocument.state === "Doesn't exist"
                        ? 'Review the applicant comment as the evidence context for this document item.'
                        : 'No uploaded file exists for this document item yet.'}
                    </p>
                  </div>
                )}
              </div>

              <article className="evidence-review-footer" aria-label="Selected document review actions">
                {selectedDocument?.applicantComment ? (
                  <div className="applicant-comment">
                    <span>Applicant comment</span>
                    <p>{selectedDocument.applicantComment}</p>
                  </div>
                ) : null}

                {selectedDocument?.absenceAcceptanceComments?.length ? (
                  <div className="reviewer-comment-history">
                    <span>Missing-document acceptance comment</span>
                    <p>{selectedDocument.absenceAcceptanceComments[0].comment}</p>
                    <time dateTime={selectedDocument.absenceAcceptanceComments[0].createdAt}>
                      {formatTimestamp(selectedDocument.absenceAcceptanceComments[0].createdAt)}
                    </time>
                  </div>
                ) : null}

                {selectedDocumentNotifications.length > 0 ? (
                  <div className="notification-feedback" role="status">
                    <MailWarning aria-hidden="true" size={16} />
                    <span>{selectedDocumentNotifications[0].message}</span>
                  </div>
                ) : null}
              </article>
            </section>

            <section className="panel field-panel" aria-labelledby="fields-heading">
              <div className="section-title-row field-title-row">
                <PencilLine aria-hidden="true" size={18} />
                <div>
                  <h3 id="fields-heading">Field Verification</h3>
                  <p>{hasSelectedDocument ? 'Compare each submitted value against the open document.' : 'Review field requirements for this task.'}</p>
                </div>
              </div>

              <div className="field-list">
                {selectedGroup.fields.map((fieldItem) => (
                  <article className={`field-row ${fieldIsComplete(fieldItem) ? 'checked' : 'unchecked'}`} key={fieldItem.id}>
                    <div className="field-label-block">
                      <h4>{fieldItem.label}</h4>
                      <p>{fieldItem.note}</p>
                    </div>
                    {fieldItem.readOnly ? (
                      <div className={`static-field-value ${fieldItem.value ? '' : 'empty'}`}>
                        {fieldItem.value || 'Blank'}
                      </div>
                    ) : (
                      <input
                        className={`static-input ${fieldItem.editedInSession ? 'edited' : ''}`}
                        type={fieldItem.inputType === 'date' ? 'date' : fieldItem.inputType === 'number' ? 'number' : 'text'}
                        value={fieldItem.value}
                        onChange={(event) => handleFieldValueChange(fieldItem.id, event.target.value)}
                      />
                    )}
                    {fieldItem.verificationMode === 'display-only' ? null : fieldItem.verificationMode === 'value-presence' ? (
                      fieldIsComplete(fieldItem) ? <span className="field-state checked">Value present</span> : null
                    ) : (
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={fieldItem.checked}
                          onChange={(event) => handleFieldCheckedChange(fieldItem.id, event.target.checked)}
                        />
                        {fieldItem.checked ? 'Confirmed' : 'Confirm'}
                      </label>
                    )}
                    {fieldItem.editedInSession ? <span className="edited-marker">Edited in this session</span> : null}
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section> : null}
    </main>
  );
}

export default App;