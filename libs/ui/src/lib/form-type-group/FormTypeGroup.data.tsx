import { FormTypeGroupInfo } from '@pabau/ui'
import React from 'react'

import { ReactComponent as ConsentSelected } from '../../assets/images/form-type/consent-selected.svg'
import { ReactComponent as Consent } from '../../assets/images/form-type/consent.svg'
import { ReactComponent as EPaperSelected } from '../../assets/images/form-type/file-pdf-selected.svg'
import { ReactComponent as EPaper } from '../../assets/images/form-type/file-pdf.svg'
import { ReactComponent as LabFormSelected } from '../../assets/images/form-type/lab-form-selected.svg'
import { ReactComponent as LabForm } from '../../assets/images/form-type/lab-form.svg'
import { ReactComponent as MedicalHistorySelected } from '../../assets/images/form-type/medical-history-selected.svg'
import { ReactComponent as MedicalHistory } from '../../assets/images/form-type/medical-history.svg'
import { ReactComponent as PresciptionSelected } from '../../assets/images/form-type/presciption-selected.svg'
import { ReactComponent as Presciption } from '../../assets/images/form-type/presciption.svg'
import { ReactComponent as TreatmentSelected } from '../../assets/images/form-type/treatment-selected.svg'
import { ReactComponent as Treatment } from '../../assets/images/form-type/treatment.svg'

export const DefaultFormTypeItems: FormTypeGroupInfo = {
  medicalHistory: {
    label: 'Medical History',
    selected: false,
    desc:
      'A medical history form can be completed and updated multiple times, whilst retaining any previously completed information     ',
    icon: <MedicalHistory />,
    iconSelected: <MedicalHistorySelected />,
  },
  consent: {
    label: 'Consent',
    selected: false,
    desc: 'A consent form requires a signature as part of the care pathway',
    icon: <Consent />,
    iconSelected: <ConsentSelected />,
  },
  treatmentForm: {
    label: 'Treatment Form',
    selected: false,
    desc: 'A treatment form is usually completed at the end of a pathway',
    icon: <Treatment />,
    iconSelected: <TreatmentSelected />,
  },
  epaper: {
    label: 'ePaper',
    selected: false,
    desc:
      'ePaper allows you to either scan in a document or upload a PDF to draw directly onto the screen using a stylus or apple pencil',
    icon: <EPaper />,
    iconSelected: <EPaperSelected />,
  },
  presciption: {
    label: 'Presciption',
    selected: false,
    desc: 'Presciption',
    icon: <Presciption />,
    iconSelected: <PresciptionSelected />,
  },
  labForm: {
    label: 'Lab Form',
    selected: false,
    desc: 'Lab Form',
    icon: <LabForm />,
    iconSelected: <LabFormSelected />,
  },
}
