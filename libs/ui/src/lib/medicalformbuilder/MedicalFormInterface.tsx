import { RuleProp, VersionItem } from '@pabau/ui'

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
  treatment: boolean
  epaper: boolean
  prescription: boolean
  lab: boolean
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
  treatment: false,
  epaper: false,
  prescription: false,
  lab: false,
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

export interface MedicalFormVersion {
  currentVersion: string
  history: {
    [key: string]: VersionItem[]
  }
}

export interface MedicalFormItem {
  name: string
  formType: string
  createdAt: string
  version: MedicalFormVersion
  status: string
  index?: number | string
  key: string
  formData: string
  rules: RuleProp[]
}

export interface SmsMessageTemplateItem {
  template_id: number
  template_name: string
}

export interface EmailMessageTemplateItem {
  template_id: number
  template_name: string
}

export interface CommunicationItem {
  id: number
  from_address: string
}

export interface UserListItem {
  id: number
  full_name: string
}
