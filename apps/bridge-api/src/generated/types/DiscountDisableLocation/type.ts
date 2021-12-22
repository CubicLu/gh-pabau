import { objectType } from 'nexus'

export const DiscountDisableLocation = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'DiscountDisableLocation',
  definition(t) {
    t.int('id')
    t.int('tax_id')
    t.int('location_id')
    t.nullable.field('Discount', {
      type: 'InvTaxRate',
      resolve(root: any) {
        return root.Discount
      },
    })
    t.nullable.field('Location', {
      type: 'CompanyBranch',
      resolve(root: any) {
        return root.Location
      },
    })
  },
})
