export interface TemplateData {
  url?: string
  name?: string
}

export interface EmailInput extends TemplateData {
  to: Array<string> | string
  subject?: string
  text?: string
  html?: string
  templateType?: string
}

export interface EmailOutput {
  success: boolean
  error?: string
}
