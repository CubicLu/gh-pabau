import { objectType } from 'nexus'

export const LoyaltyPoint = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'LoyaltyPoint',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.float('points')
    t.int('contact_id')
    t.nullable.field('CmContact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.CmContact
      },
    })
  },
})
