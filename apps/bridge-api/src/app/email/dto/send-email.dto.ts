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

export interface EmailInput extends DynamicTemplateData {
  to: Array<string> | string
  from?: string
  subject?: string
  text?: string
  html?: string
  name?: string
  templateType?: string
}

export interface EmailRelationsInput {
  contact_id?: number
  lead_id?: number
  staff_id?: number
  booking_id?: number
  invoice_id?: number
}

export interface EmailWithTagsInput extends EmailInput {
  relations?: EmailRelationsInput
}

export interface EmailOutput {
  success: boolean
  error?: string
}
