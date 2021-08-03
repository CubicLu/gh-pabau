import { objectType } from 'nexus'

export const LoyaltyPoints = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'LoyaltyPoints',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.float('points')
    t.int('contact_id')
    t.field('Contact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.Contact
      },
    })
  },
})
