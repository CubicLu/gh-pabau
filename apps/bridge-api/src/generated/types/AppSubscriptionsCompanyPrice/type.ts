import { objectType } from 'nexus'

export const AppSubscriptionsCompanyPrice = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AppSubscriptionsCompanyPrice',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.string('app_key_value')
    t.float('price')
  },
})
