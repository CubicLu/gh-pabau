import { objectType } from 'nexus'

export const Voucher = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Voucher',
  definition(t) {
    t.int('id')
    t.nullable.string('code')
    t.nullable.field('type', { type: 'cm_vouchers_type' })
    t.string('description')
    t.nullable.float('amount')
    t.nullable.field('valid', { type: 'cm_vouchers_valid' })
    t.nullable.field('date_from', { type: 'DateTime' })
    t.nullable.field('date_to', { type: 'DateTime' })
    t.nullable.field('time_from', { type: 'DateTime' })
    t.nullable.field('time_to', { type: 'DateTime' })
    t.nullable.field('expiry_date', { type: 'DateTime' })
    t.nullable.field('every', { type: 'cm_vouchers_every' })
    t.nullable.int('company_id')
    t.string('purchased_for')
    t.nullable.string('purchased_by')
    t.string('status')
    t.float('remaining_balance')
    t.int('lead_id')
    t.string('voucher_contact_email')
    t.int('voucher_contact_mobile')
    t.field('purchase_date', { type: 'DateTime' })
    t.nullable.int('purchaser_contact_id')
    t.nullable.int('purchased_for_id')
    t.int('imported')
    t.int('voucher_type')
    t.int('sales_id')
    t.int('sms_campaign_id')
    t.int('template_id')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('Contact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.Contact
      },
    })
    t.nullable.field('Purchaser', {
      type: 'CmContact',
      resolve(root: any) {
        return root.Purchaser
      },
    })
    t.nullable.field('Invoice', {
      type: 'InvSale',
      resolve(root: any) {
        return root.Invoice
      },
    })
  },
})
