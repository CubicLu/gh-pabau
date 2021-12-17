import { RuleProp, VersionItem } from '@pabau/ui'

export interface OptionType {
  id: number
  name: string
  editing: boolean
}

export interface AttrFieldType {
  attrId?: number
  attrName?: string
  attrValue?: string | string[]
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
  attrName: string
  attrValue: string
  attrId: number
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
  attrName: '',
  attrValue: '',
  attrId: 0,
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

export interface MedicalConditionsListItem {
  id: number
  name: string
}

export interface PreviewAttr {
  id: number
  MedicalAttr: {
    id: number
    name: string
  }
  attr_id: number
  contact_id: number
  group_label: string
  value: string
}

export interface DrugItem {
  id: number
  name: string
  comment?: string
  dosage?: string
  frequency?: string
  is_active?: boolean
  is_required?: boolean
  is_vaccine?: boolean
  lot_number?: string
  max_age?: number
  min_age?: number
}

export const previewMapping = [
  { heading: 'form_statictext' },
  { staticText: 'form_statictext' },
  { input_text: 'form_textfield' },
  { team: 'empty' },
  { textarea: 'form_textarea' },
  { checkbox: 'form_checkbox' },
  { radio: 'form_singlechoice' },
  { select: 'form_dropdown' },
  { image: 'form_drawing' },
  { staticImage: 'form_image' },
  { diagram_mini: 'form_drawing' },
  { signature: 'form_signature' },
  { cl_drugs: 'form_drugs' },
  { labs_tests: 'form_labtests' },
  { snomed: 'form_snomed' },
  { slider: 'form_slider' },
  { vaccine_scheduler: 'empty' },
  { vaccine_history: 'empty' },
  { travel_destination: 'form_travel' },
  { btn_medical_condition: 'form_medicalcondition' },
  { diagram: 'empty' },
  { facediagram: 'empty' },
  { diagram_mini: 'empty' },
  { photo_and_drawer: 'form_photoupload' },
  { epaper: 'empty' },
  { custom_photo_and_drawer: 'empty' },
  { cl_services: 'empty' },
  { history_data: 'empty' },
]

export interface MedicalFormContactDetailData {
  label: string
  content: string
  clsClass: string
}

export interface MedicalFormContactData {
  patient: string
  lastUpdate: string
  createdOn: string
  createdBy: string
  details: MedicalFormContactDetailData[]
}

export interface MedicalFormContact {
  id: number
  name: string
  user: string
  created: string
  type: string
  isPinned: boolean
  isAdminForm: boolean
  data: MedicalFormContactData
  formId?: number
  contactId?: number
}

export interface ContactMedicalCondition {
  id: number
  name: string
}

export interface ContactMedicalLabTest {
  id: number
  name: string
  product_id: number
}
