import { objectType } from 'nexus'

export const SaleItem = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'SaleItem',
  definition(t) {
    t.int('id')
    t.int('sale_id')
    t.int('product_id')
    t.string('product_code')
    t.string('product_name')
    t.string('product_unit')
    t.int('tax_rate_id')
    t.string('tax')
    t.float('quantity')
    t.float('unit_price')
    t.float('gross_total')
    t.float('val_tax')
    t.nullable.int('company_id')
    t.nullable.int('uid')
    t.nullable.int('staff_purchase')
    t.nullable.field('created_date', { type: 'DateTime' })
    t.nullable.field('modified_date', { type: 'DateTime' })
    t.int('custom_id')
    t.int('sale_custom_id')
    t.int('contact_custom_id')
    t.int('product_custom_id')
    t.int('Practitioner_id')
    t.int('Threatment_id')
    t.int('User_id')
    t.int('VAT_id')
    t.float('LineDiscount')
    t.int('imported')
    t.float('UnitDiscount')
    t.nullable.string('discount_reason')
    t.nullable.int('product_category_id')
    t.nullable.string('product_category_name')
    t.nullable.string('product_category_type')
    t.int('from_pos')
    t.float('tax_total')
    t.string('custom_product_name')
    t.nullable.int('booking_id')
    t.nullable.field('Tax', {
      type: 'Tax',
      resolve(root: any) {
        return root.Tax
      },
    })
    t.field('Product', {
      type: 'InvProduct',
      resolve(root: any) {
        return root.Product
      },
    })
    t.nullable.field('InvSale', {
      type: 'InvSale',
      resolve(root: any) {
        return root.InvSale
      },
    })
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
