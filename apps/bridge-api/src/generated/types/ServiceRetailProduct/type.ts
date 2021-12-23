import { objectType } from 'nexus'

export const ServiceRetailProduct = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ServiceRetailProduct',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('service_id')
    t.int('product_id')
    t.int('quantity')
    t.int('consumable_deduction')
    t.field('CompanyService', {
      type: 'CompanyService',
      resolve(root: any) {
        return root.CompanyService
      },
    })
    t.field('Product', {
      type: 'InvProduct',
      resolve(root: any) {
        return root.Product
      },
    })
  },
})
