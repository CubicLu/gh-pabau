import React, { FC, useRef } from 'react'
import styles from './ClientFinancialsLayout.module.less'
import { TabMenu } from '@pabau/ui'
import { TotalPaymentsCountQuery } from '@pabau/graphql'

export interface InvoiceInvoicePayments {
  id: number
  employee: string
  method: string
  amount: number
  date: string
  note?: string
  showNote?: boolean
  noteSaved?: boolean
}

export interface InvoiceInvoiceHistory {
  title?: string
  date?: string
  description?: string
  notif_by?: string
  type?: string
  views?: number
  amount?: number
}

export interface InvoiceTipProp {
  amount?: string
  type?: number
  staff?: number
}

export interface InvoiceItemProductCategory {
  id?: string | number
  name?: string
}

export interface InvoiceDiscountProp {
  id: number | string
  name?: string
  rate: number
  type: string
}

export interface InvoiceItemProp {
  employee: string | number
  id: number
  name: string
  price: number
  quantity: number
  quantityAllowed?: number
  discount?: InvoiceDiscountProp
  tax: number
  showTaxDropDown?: boolean
  type?: string
  customDiscountType?: string
  showDiscountDropDown?: boolean
  customDiscount?: string
  productCategory?: InvoiceItemProductCategory
}

export interface InvoiceCustomer {
  Fname?: string
  ID?: number
  Lname?: string
}

export interface InvoiceProp {
  guid?: string
  id: string
  invoice_id?: string
  type?: string
  booking?: number | null
  date: string
  location?: string | number
  issuingCompany?: number | null
  contract?: number
  note?: string
  employee: string
  issuedTo: string
  paid: boolean
  status?: string
  items: InvoiceItemProp[]
  totalVat: number
  amountPaid: number
  subtotal: number
  tips: number
  grandTotal: number
  paymentStatus: number
  paymentStatusTooltip?: string
  tip?: InvoiceTipProp
  history?: InvoiceInvoiceHistory[]
  payments?: InvoiceInvoicePayments[]
  customer?: InvoiceCustomer
}

export interface FinancialPayment {
  id: number
  date: string
  invoiceNo: number
  paymentNo: number
  location: string
  employee: string
  paidBy: string
  method: string
  amount: number
}

export interface FinancialItem {
  id: number
  date: string
  invoiceNo: number
  name: string
  type: string
  employee: string
  soldBy: string
  qty: number
}

export interface FinancialVoidedPayment {
  id: number
  refNo: number
  items: string
  amount: number
  voidedBy: string
  date: string
}

export interface FinancialStatements {
  id: number
  refNo: number
  startDate: string
  endDate: string
  issuedTo: string
  location: string
}

export interface ClientFinancialsLayoutProps {
  clientId?: number
  isEmpty?: boolean
  totalOutstanding?: number
  totalInvoiced?: number
  accountCredit?: number
  totalPayments?: number
  totalSales?: number
  totalBalance?: number
  invoices: InvoiceProp[]
  payments: FinancialPayment[]
  items: FinancialItem[]
  voidedPayments: FinancialVoidedPayment[]
  statements: FinancialStatements[]
  tabLabels?: string[]
  totalPaymentCounts?: TotalPaymentsCountQuery
}

export const ClientFinancialsLayout: FC<ClientFinancialsLayoutProps> = (
  props
) => {
  const ref = useRef<HTMLDivElement>(null)
  const { tabLabels, children } = props

  return (
    <div className={styles.clientLayout} ref={ref}>
      <TabMenu tabPosition="top" menuItems={tabLabels}>
        {children}
      </TabMenu>
    </div>
  )
}

export default ClientFinancialsLayout
