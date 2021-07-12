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
  subject?: string
  text?: string
  html?: string
  name?: string
  templateType?: string
}

export interface EmailOutput {
  success: boolean
  error?: string
}
