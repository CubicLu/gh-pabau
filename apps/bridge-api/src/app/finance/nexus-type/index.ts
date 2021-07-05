import { objectType, list } from 'nexus'

export const FinanceInvoiceResponse = objectType({
  name: 'FinanceInvoiceResponse',
  definition(t) {
    t.int('id')
    t.string('invoiceNo')
    t.string('location')
    t.date('invDate')
    t.string('customer')
    t.string('debtor')
    t.string('payment')
    t.string('net')
    t.string('gst')
    t.string('gross')
    t.string('paid')
    t.string('balance')
    t.int('status')
    t.string('tooltip')
  },
})

export const FindManyAccountPaymentResponse = objectType({
  name: 'FindManyAccountPaymentResponse',
  definition(t) {
    t.int('id')
    t.string('invoiceNo')
    t.string('location')
    t.date('invDate')
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
    t.date('time')
  },
})

export const FindManyAccountDebtResponse = objectType({
  name: 'FindManyAccountDebtResponse',
  definition(t) {
    t.int('id')
    t.string('invoiceNo')
    t.string('location')
    t.date('invDate')
    t.string('customer')
    t.string('debtor')
    t.string('payment')
    t.string('balance')
    t.string('tooltip')
    t.int('status')
    t.field('lastAction', {
      type: list(LastAction),
    })
  },
})

export const FindManyAccountCreditNoteResponse = objectType({
  name: 'FindManyAccountCreditNoteResponse',
  definition(t) {
    t.int('id')
    t.string('creditNo')
    t.string('location')
    t.date('creditDate')
    t.string('customer')
    t.string('debtor')
    t.string('invoiceNo')
    t.string('total')
    t.string('type')
    t.string('tooltip')
  },
})
