export interface TemplateData {
  url?: string
  name?: string
}

export interface IData {
  key: string
  value: string | number | boolean
}

export interface DynamicTemplateData {
  fields?: IData[]
}

export interface SmsInput extends DynamicTemplateData {
  to: Array<string> | string
  from?: string
  message?: string
}

export interface SmsRelationsInput {
  contact_id?: number
  lead_id?: number
  staff_id?: number
  booking_id?: number
  invoice_id?: number
}

export interface EmailWithTagsInput extends SmsInput {
  relations?: SmsRelationsInput
}

export interface SmsOutput {
  success: boolean
  error?: string
}
