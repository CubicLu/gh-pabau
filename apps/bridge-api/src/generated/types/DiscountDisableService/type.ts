import { objectType } from 'nexus'

export const DiscountDisableService = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'DiscountDisableService',
  definition(t) {
    t.int('id')
    t.int('tax_id')
    t.int('service_id')
    t.nullable.field('Discount', {
      type: 'InvTaxRate',
      resolve(root: any) {
        return root.Discount
      },
    })
    t.nullable.field('Service', {
      type: 'CompanyService',
      resolve(root: any) {
        return root.Service
      },
    })
  },
})
