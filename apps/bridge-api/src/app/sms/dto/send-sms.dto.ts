export interface TextLocalResponse {
  data?: any
  status?: any
  num_messages?: any
}

export interface NexmoResponse {
  data?: any
  messages?: any
}

export interface SmsResponse {
  success?: any
  message_count?: any
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
