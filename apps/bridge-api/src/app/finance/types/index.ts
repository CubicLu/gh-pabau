export interface FinanceInput {
  searchTerm?: string
  startDate?: Date
  endDate?: Date
  locationId?: number
  issuingCompanyId?: number
  creditNoteType?: string
}

export interface InvoiceType {
  totalNet: number
  totalVat: number
}
export interface InvoiceResponse {
  [name: number]: InvoiceType
}

export interface ActionType {
  communication_id: number
  time: Date
}

export interface ActionResponse {
  [name: number]: ActionType[]
}

export interface InvoiceQueryResult {
  id: number
  invoiceNo: string
  debtor: string
  contractId: number
  insurerName: string
  total: number
  creditAmount: number
  customerId: number
  paidAmount: number
  outstanding: number
  discountAmount: number
  location: string
  invDate: Date
  xero_status: number
  xero_response: string
  xero_modifiedAt: Date
  healthcode_status: string
}

export interface FinanceCountQueryResult {
  id: number
}

export interface PaymentQueryResult {
  id: number
  invoiceNo: string
  location: string
  invDate: Date
  customer: string
  amount: number
  payment: string
  user: string
}

export interface DebtQueryResult {
  id: number
  invoiceNo: string
  location: string
  invDate: Date
  debtor: string
  total: number
  creditAmount: number
  paidAmount: number
  outstanding: number
  discountAmount: number
  xero_status: number
  xero_response: string
  xero_modifiedAt: Date
  customerId: number
  contractId: number
  insurerName: string
  healthcode_status: string
}

export interface CreditNoteQueryResult {
  id: number
  creditNo: string
  debtor: string
  insurerName: string
  contractId: number
  customerId: number
  creditNoteType: string
  invoiceNo: number
  total: number
  location: string
  invDate: Date
  xero_status: number
  xero_response: string
  xero_modifiedAt: Date
}
