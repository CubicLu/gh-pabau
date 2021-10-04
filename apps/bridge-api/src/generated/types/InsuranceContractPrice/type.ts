import { objectType } from 'nexus'

export const InsuranceContractPrice = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'InsuranceContractPrice',
  definition(t) {
    t.int('id')
    t.int('contract_id')
    t.int('product_id')
    t.float('price')
    t.float('price_0')
    t.float('price_1')
    t.float('price_2')
    t.float('price_3')
    t.float('price_4')
    t.float('price_5')
    t.float('price_6')
    t.int('company_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('Product', {
      type: 'InvProduct',
      resolve(root: any) {
        return root.Product
      },
    })
    t.field('Contract', {
      type: 'ContactInsurance',
      resolve(root: any) {
        return root.Contract
      },
    })
  },
})
