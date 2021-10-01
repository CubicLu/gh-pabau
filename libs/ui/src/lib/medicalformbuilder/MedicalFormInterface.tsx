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

export interface MedicalFormAdvancedSettingItem {
  language: string
  headingUse: string
  submitButtonLabel: string
  ackRedirect: string
  thkTextType: string
  thkShowLink: number
  thkAddSocial: number
  thkText: string
  redirectText: string
  paymentEnable: number
  paymentAmount: number
  cardNumber: string
  cardExpiration: string
  cardCvv: string
}

export interface MedicaFormAdvanceSettingData {
  id: number
  shareToClient: number
  reminder: number
  data: MedicalFormAdvancedSettingItem
}

export const defaultMedicaFormAdvanceSettingData: MedicaFormAdvanceSettingData = {
  id: 0,
  shareToClient: 0,
  reminder: 0,
  data: {
    language: 'English (UK)',
    headingUse: 'use_to_separate',
    submitButtonLabel: '',
    ackRedirect: 'ty_page',
    thkTextType: 'plain_text',
    thkShowLink: 0,
    thkAddSocial: 0,
    thkText: '',
    redirectText: '',
    paymentEnable: 0,
    paymentAmount: 0,
    cardNumber: '',
    cardExpiration: '',
    cardCvv: '',
  },
}

export interface MedicalFormItem {
  name: string
  formType: string
  serviceId: string
  createdAt: string
  version: MedicalFormVersion
  status: string
  index?: number | string
  key: string
  formData: string
  rules: RuleProp[]
  advSetting: MedicaFormAdvanceSettingData
}

export interface SNOMED {
  id: string
  term: string
  conceptId: string
  fsn: string
}

export interface MacroItem {
  id: number
  title: string
  message: string
  type: number
  createdAt: string
}

export interface UserGroupListItem {
  id: number
  group_name: string
}

export interface CompanyListItem {
  id: number
  name: string
}

export interface LabTestsListItem {
  id: number
  name: string
}

export interface InvProductsListItem {
  id: number
  name: string
  category_id: number
}
