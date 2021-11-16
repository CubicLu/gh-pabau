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
    t.nullable.field('xero_updated_date', { type: 'DateTime' })
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
    t.nullable.field('Location', {
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
    t.nullable.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
    t.nullable.field('InsuranceDetail', {
      type: 'InsuranceDetail',
      resolve(root: any) {
        return root.InsuranceDetail
      },
    })
    t.nullable.field('IssuingCompany', {
      type: 'IssuingCompany',
      resolve(root: any) {
        return root.IssuingCompany
      },
    })
    t.nullable.field('InvBiller', {
      type: 'InvBiller',
      resolve(root: any) {
        return root.InvBiller
      },
    })
    t.nullable.field('package', {
      type: 'ContactPackage',
      resolve(root: any) {
        return root.package
      },
    })
    t.nullable.field('CreditRef', {
      type: 'InvSale',
      resolve(root: any) {
        return root.CreditRef
      },
    })
    t.list.field('CreditNotes', {
      type: 'InvSale',
      args: {
        where: 'InvSaleWhereInput',
        orderBy: 'InvSaleOrderByWithRelationInput',
        cursor: 'InvSaleWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvSaleScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CreditNotes
      },
    })
    t.list.field('Booking', {
      type: 'Booking',
      args: {
        where: 'BookingWhereInput',
        orderBy: 'BookingOrderByWithRelationInput',
        cursor: 'BookingWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'BookingScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Booking
      },
    })
    t.list.field('InvPayment', {
      type: 'InvPayment',
      args: {
        where: 'InvPaymentWhereInput',
        orderBy: 'InvPaymentOrderByWithRelationInput',
        cursor: 'InvPaymentWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvPaymentScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvPayment
      },
    })
    t.list.field('SaleItem', {
      type: 'SaleItem',
      args: {
        where: 'SaleItemWhereInput',
        orderBy: 'SaleItemOrderByWithRelationInput',
        cursor: 'SaleItemWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'SaleItemScalarFieldEnum',
      },
      resolve(root: any) {
        return root.SaleItem
      },
    })
    t.list.field('Voucher', {
      type: 'Voucher',
      args: {
        where: 'VoucherWhereInput',
        orderBy: 'VoucherOrderByWithRelationInput',
        cursor: 'VoucherWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'VoucherScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Voucher
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
