export interface OptionType {
  id: number
  name: string
  editing: boolean
}

export interface MedicalFormTypes {
  id: string
  formType: string
  formName: string
  txtQuestion: string
  txtQuestionWithTag: string
  txtBlock: string
  txtBlockWithTag: string
  txtInputType: string
  txtDefaults: string
  txtDefaultsWithTag: string
  txtLinkedField: string
  signData: string
  arrItems: OptionType[]
  required: boolean
  txtValue: string
  arrValue: string[]
}

export interface MedicalForms {
  id: number
  formType: string
  formName: string
}

export interface SelectedForms {
  medicalHistory: boolean
  consent: boolean
  treatmentForm: boolean
  epaper: boolean
  presciption: boolean
  labForm: boolean
}

export interface ArrayItem {
  value: string
  baseline: boolean
  critical: boolean
  desc?: string
  trigger?: number
}

export const defaultSelectedFormInfos: SelectedForms = {
  medicalHistory: false,
  consent: false,
  treatmentForm: false,
  epaper: false,
  presciption: false,
  labForm: false,
}

export const defaultFormValue: MedicalFormTypes = {
  id: '',
  formType: '',
  formName: '',
  txtQuestion: '',
  txtQuestionWithTag: '',
  txtBlock: '',
  txtBlockWithTag: '',
  txtInputType: '',
  txtDefaults: '',
  txtDefaultsWithTag: '',
  txtLinkedField: '',
  signData: '',
  arrItems: [],
  required: false,
  txtValue: '',
  arrValue: [],
}

export interface PreviewData {
  previewData: string
}
