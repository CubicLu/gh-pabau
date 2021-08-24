import { objectType } from 'nexus'

export const PointOfSaleSetting = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'PointOfSaleSetting',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('disable_service')
    t.int('disable_products')
    t.int('disable_packages')
    t.int('disable_giftcards')
    t.int('disable_account')
    t.int('disable_price_override')
    t.string('print_mode')
    t.int('disable_discount')
    t.string('email_receipt_text')
    t.string('theme_col')
    t.string('bank_account')
    t.string('bank_number')
    t.string('sort_code')
    t.string('bank_name')
    t.string('iban')
    t.string('swift')
    t.int('cashup_settings')
    t.string('default_payment_type')
    t.int('disable_loyalty')
    t.int('email_receipt_template')
    t.int('enable_bank_details')
    t.string('vat')
    t.int('enable_biller_settings')
    t.int('display_taxes')
    t.int('use_pabau_id')
    t.int('starting_invoice_number')
    t.int('enable_next_appointment')
    t.int('show_paid_label')
    t.string('paid_label')
    t.int('display_quantity')
    t.int('display_unit_cost')
    t.string('logo_position')
    t.boolean('force_discount_reason')
    t.int('automatic_booking')
    t.int('gift_msg_template_id')
    t.int('gift_sms_template_id')
    t.nullable.int('package_use_by_date')
    t.int('locked')
    t.nullable.int('cron_day')
    t.nullable.field('lock_sale_date', { type: 'DateTime' })
    t.int('stock_mode')
    t.nullable.string('inv_template')
    t.int('lock_invoice_edit')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
