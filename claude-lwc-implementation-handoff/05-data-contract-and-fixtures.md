# Data Contract and Fixtures

Use this file to seed the first LWC implementation. The exact Salesforce object model can change later; the initial UI should preserve this shape and sample coverage.

## 1. Applicant header fixture

```js
const applicant = {
  name: 'Dana Levi',
  applicationReference: 'APP-2026-0148',
  programName: 'Dell IL Tech Leaders',
};
```

## 2. Required sample coverage

The fixtures must include:

- All five verification groups.
- Complete and incomplete groups.
- `Verified`, `Uploaded`, `Not uploaded`, `Reopened`, and `Doesn't exist` document states.
- At least two documents with multiple uploaded files.
- Applicant comments for selected document scenarios.
- A reopened document with a previous reviewer comment.
- A `Doesn't exist` document with no preview.
- Checked and unchecked fields.
- An edited-in-session field marker.

## 3. Group fixture outline

### Applicant ID

Documents:

- `ID`: `Verified`, one uploaded file, applicant comment `Clear scan of front ID.`
- `Back of ID`: `Uploaded`, two uploaded files, applicant replacement is latest, applicant comment about clearer back-side image.
- `ID appendix`: `Not uploaded`, no files, applicant comment `I do not currently have an appendix document.`

Fields:

- First name = `Dana`, checked.
- Last name = `Levi`, checked.
- ID number = `031245678`, checked.
- Date of birth = `1999-04-18`, unchecked.
- Marital status = `Single`, unchecked.
- Number of children under 18 = `0`, checked, edited in session.

### Parent 1 ID

Documents:

- `ID`: `Verified`, one uploaded file.
- `Back of ID`: `Verified`, one uploaded file.
- `ID appendix`: `Verified`, no file, `missingDocumentReturnState = "Doesn't exist"`.

Fields:

- Number of siblings under 24 years of age = `2`, checked.

### Parent 2 ID

Documents:

- `ID`: `Verified`, one uploaded file.
- `Back of ID`: `Reopened`, one uploaded file, reviewer comment asking for back side of ID because current file duplicates front side.
- `ID appendix`: `Doesn't exist`, no files, applicant comment `Parent 2 has no appendix document.`

Optional refreshed-data scenario:

- `Back of ID`: `Uploaded` after applicant replacement upload, with prior reviewer comment preserved and a new uploaded file labeled `Requested correction replacement`.

Fields:

- Number of siblings under 24 years of age = `2`, checked.

### Applicant Income

Documents:

- `Income statement`: `Uploaded`, two uploaded files for June and May.
- `Benefits statement`: `Not uploaded`, no files, applicant comment `Waiting for National Insurance statement.`

Fields:

- Applicant income = `4,850 NIS/month`, unchecked.

### Applicant Disability Status

Documents:

- `Disability certificate`: `Verified`, one uploaded file.

Fields:

- Applicant disability percentage = `40%`, checked.

## 4. Uploaded-file display rules

For uploaded-file tabs, display timestamp only:

```text
2026-06-24
14:32
```

In preview details, include filename and upload label when space permits:

```text
back-id-replacement-2026-06-24.pdf
Applicant replacement
2026-06-24 14:32
```

## 5. Comment fixture examples

Reopen comment:

```text
Please upload the back side of Parent 2 ID. The current file duplicates the front side.
```

Reopen comment submitted during screenshot capture:

```text
Please upload a clearer back-side ID image where all text is readable.
```

Missing-document acceptance comment submitted during screenshot capture:

```text
Applicant comment confirms there is no appendix, and the surrounding ID evidence is sufficient.
```

## 6. Preview placeholder

The mock LWC does not need real file rendering. Use a placeholder preview that communicates:

- Selected group name.
- Upload label.
- Generic document lines and boxes.
- Filename.
- Timestamp.

Include a compact `View full screen` or equivalent icon-only inspection affordance beside the uploaded-file tabs when a file is selected. It can be disabled or no-op until a production file viewer exists.

For no-preview states, show:

```text
No preview available
Review the applicant comment as the evidence context for this document item.
```

or, for `Not uploaded`:

```text
No preview available
No uploaded file exists for this document item yet.
```
