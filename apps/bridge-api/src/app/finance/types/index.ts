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

export interface InvoiceArgs {
  guid?: string
  saleId?: number
}

export interface SalesData {
  key: string
  after_disc: string
  category: string
  date: string
  description: string
  disc_amount: string
  disc_per: string
  net: string
  practitioner: string
  product: string
  quantity: string
  sku: string
  total: string
  unitprice: string
  vat: string
  vat_per: string
}

export interface PaymentsData {
  key: string
  insurer: string
  payment_date: string
  payment_method: string
  payment_amount: string
}

export interface PaymentsDetails {
  key: number
  total_vat: string
  amount_paid: string
  sub_total_amount: number
  outstanding: number
  grand_total: number
  refund_amount: number
  paid: number
  total_net: string
  payment_time: string
  total: number
  card: number
  cash: number
}

export interface Details {
  issue_to: string
  issue_by: string
  invoice_id: string
}

export interface InvoiceOutput {
  details: Details
  items: SalesData[]
  payments: PaymentsData[]
  payment_details: PaymentsDetails
}
