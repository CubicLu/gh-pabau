import { objectType, list } from 'nexus'

export const FinanceInvoiceResponse = objectType({
  name: 'FinanceInvoiceResponse',
  definition(t) {
    t.int('id')
    t.string('invoiceNo')
    t.string('location')
    t.field('invDate', { type: 'DateTime' })
    t.string('customer')
    t.string('debtor')
    t.string('payment')
    t.string('net')
    t.string('gst')
    t.string('gross')
    t.string('paid')
    t.string('balance')
    t.string('tooltip')
    t.boolean('isHealthcodeEnabled')
    t.string('healthcodeStatus')
  },
})

export const FindManyAccountPaymentResponse = objectType({
  name: 'FindManyAccountPaymentResponse',
  definition(t) {
    t.int('id')
    t.string('invoiceNo')
    t.string('location')
    t.field('invDate', { type: 'DateTime' })
    t.string('customer')
    t.string('amount')
    t.string('payment')
    t.string('user')
  },
})

export const LastAction = objectType({
  name: 'LastAction',
  definition(t) {
    t.int('communication_id')
    t.field('time', { type: 'DateTime' })
  },
})

export const FindManyAccountDebtResponse = objectType({
  name: 'FindManyAccountDebtResponse',
  definition(t) {
    t.int('id')
    t.string('invoiceNo')
    t.string('location')
    t.field('invDate', { type: 'DateTime' })
    t.string('customer')
    t.string('debtor')
    t.string('payment')
    t.string('balance')
    t.string('tooltip')
    t.int('status')
    t.field('lastAction', {
      type: list(LastAction),
    })
    t.boolean('isHealthcodeEnabled')
    t.string('healthcodeStatus')
  },
})

export const FindManyAccountCreditNoteResponse = objectType({
  name: 'FindManyAccountCreditNoteResponse',
  definition(t) {
    t.int('id')
    t.string('creditNo')
    t.string('location')
    t.field('creditDate', { type: 'DateTime' })
    t.string('customer')
    t.string('debtor')
    t.string('invoiceNo')
    t.string('total')
    t.string('type')
    t.string('tooltip')
  },
})

const SalesData = objectType({
  name: 'SalesData',
  definition(t) {
    t.string('key')
    t.string('after_disc')
    t.string('category')
    t.field('date', { type: 'DateTime' })
    t.string('description')
    t.string('disc_amount')
    t.string('disc_per')
    t.string('net')
    t.string('practitioner')
    t.string('product')
    t.string('quantity')
    t.string('sku')
    t.string('total')
    t.string('unitprice')
    t.string('vat')
    t.string('vat_per')
  },
})
const PaymentsData = objectType({
  name: 'PaymentsData',
  definition(t) {
    t.string('key')
    t.string('insurer')
    t.field('payment_date', { type: 'DateTime' })
    t.string('payment_method')
    t.string('payment_amount')
  },
})
const PaymentsDetails = objectType({
  name: 'payment',
  definition(t) {
    t.int('key')
    t.string('total_vat')
    t.string('amount_paid')
    t.string('sub_total_amount')
    t.string('outstanding')
    t.string('grand_total')
    t.string('refund_amount')
    t.string('paid')
    t.string('total_net')
    t.field('payment_time', { type: 'DateTime' })
    t.string('total')
    t.int('card')
    t.int('cash')
  },
})

const PaymentsDetail = objectType({
  name: 'statementpayment',
  definition(t) {
    t.int('key')
    t.string('total_vat')
    t.string('amount_paid')
    t.string('sub_total_amount')
    t.string('outstanding')
    t.string('grand_total')
    t.string('refund_amount')
    t.string('paid')
    t.string('total_net')
  },
})

const invSaleDetails = objectType({
  name: 'details',
  definition(t) {
    t.string('issue_to')
    t.string('issue_by')
    t.string('invoice_id')
    t.field('date', { type: 'DateTime' })
  },
})

export const InvSaleData = objectType({
  name: 'InvSaleData',
  definition(t) {
    t.field('details', { type: invSaleDetails })
    t.list.field('items', { type: SalesData })
    t.list.field('payments', { type: PaymentsData })
    t.field('payment_details', { type: PaymentsDetails })
  },
})

export const StatementSaleData = objectType({
  name: 'StatementSaleData',
  definition(t) {
    t.field('details', { type: invSaleDetails })
    t.list.field('items', { type: SalesData })
    t.field('payments', { type: PaymentsDetail })
  },
})
