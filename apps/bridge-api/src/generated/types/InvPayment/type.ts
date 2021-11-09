import { objectType } from 'nexus'

export const InvPayment = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'InvPayment',
  definition(t) {
    t.int('id')
    t.string('from')
    t.int('date')
    t.float('amount')
    t.int('invoice')
    t.string('pmethod')
    t.nullable.int('account_balance')
    t.nullable.int('contact_id')
    t.int('company_id')
    t.nullable.int('order_id')
    t.int('uid')
    t.string('card_type')
    t.float('charge_amount')
    t.int('card_digits')
    t.nullable.field('datetime', { type: 'DateTime' })
    t.string('note')
    t.int('new_way2')
    t.int('new_way3')
    t.string('ref_num')
    t.string('custom_pmethod')
    t.string('xero_payment_id')
    t.nullable.int('is_insurance')
    t.nullable.int('payment_id')
    t.int('custom_id')
    t.int('imported')
    t.int('custom_contact_id')
    t.string('custom_contact_name')
    t.int('custom_invoice_id')
    t.int('insurer_id')
    t.int('is_credit_note')
    t.nullable.field('CmContact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.CmContact
      },
    })
    t.nullable.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('InvSale', {
      type: 'InvSale',
      resolve(root: any) {
        return root.InvSale
      },
    })
  },
})
