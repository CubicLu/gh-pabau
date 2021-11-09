export interface TextLocalResponse {
  status?: string
  num_messages?: number
}

export interface NexmoResponse {
  messages?: any
}

export interface SmsInput {
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
