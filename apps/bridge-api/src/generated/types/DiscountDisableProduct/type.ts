import { objectType } from 'nexus'

export const DiscountDisableProduct = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'DiscountDisableProduct',
  definition(t) {
    t.int('id')
    t.int('tax_id')
    t.int('product_id')
    t.nullable.field('Discount', {
      type: 'InvTaxRate',
      resolve(root: any) {
        return root.Discount
      },
    })
    t.nullable.field('Product', {
      type: 'InvProduct',
      resolve(root: any) {
        return root.Product
      },
    })
  },
})
