import { objectType } from 'nexus'

export const InvSale = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'InvSale',
  definition(t) {
    t.int('id')
    t.string('reference_no')
    t.nullable.int('warehouse_id')
    t.int('biller_id')
    t.string('biller_name')
    t.int('customer_id')
    t.string('customer_name')
    t.field('date', { type: 'DateTime' })
    t.nullable.string('note')
    t.float('inv_total')
    t.float('total_tax')
    t.float('total')
    t.nullable.float('paid_amount')
    t.nullable.float('store_discount')
    t.float('discount_amount')
    t.nullable.float('account_amount')
    t.nullable.string('loyalty_card_num')
    t.nullable.string('loyalty_card_amount')
    t.nullable.string('voucher_no')
    t.nullable.float('voucher_amount')
    t.int('invoice_type')
    t.string('in_type')
    t.float('total_tax2')
    t.int('tax_rate2_id')
    t.float('shipping_rate')
    t.int('shipping_rate_id')
    t.nullable.int('delivery')
    t.nullable.field('delivery_date', { type: 'DateTime' })
    t.nullable.int('by_email')
    t.nullable.int('by_sms')
    t.nullable.float('tip')
    t.nullable.int('company_id')
    t.nullable.int('uid')
    t.nullable.field('created_date', { type: 'DateTime' })
    t.nullable.field('modified_date', { type: 'DateTime' })
    t.nullable.string('paid_by')
    t.int('booking_id')
    t.int('quaser_booking_id')
    t.int('invoice_bit')
    t.string('custom_id')
    t.string('contact_custom_id')
    t.int('Practitioner_id')
    t.int('User_id')
    t.int('Treatment_id')
    t.int('imported')
    t.float('VAT_drop')
    t.nullable.int('order_id')
    t.boolean('void')
    t.nullable.string('guid')
    t.string('old_paid_by')
    t.int('loyalty_points')
    t.string('xero_invoice_id')
    t.field('xero_updated_date', { type: 'DateTime' })
    t.int('split_count')
    t.string('split_guid')
    t.int('insurer_contract_id')
    t.int('lock_sale')
    t.int('location_id')
    t.int('contract_id')
    t.boolean('is_ok')
    t.int('refund_to')
    t.int('credit_ref_id')
    t.float('credit_amount')
    t.int('credit_type')
    t.nullable.int('issuer_id')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('Location', {
      type: 'CompanyBranch',
      resolve(root: any) {
        return root.Location
      },
    })
    t.nullable.field('CmContact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.CmContact
      },
    })
    t.list.field('Booking', {
      type: 'Booking',
      args: {
        where: 'BookingWhereInput',
        orderBy: 'BookingOrderByInput',
        cursor: 'BookingWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'BookingScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Booking
      },
    })
    t.nullable.field('_count', {
      type: 'InvSaleCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
