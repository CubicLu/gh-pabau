import { objectType } from 'nexus'

export const LoyaltyLog = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'LoyaltyLog',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('contact_id')
    t.float('amount')
    t.string('promotion_type')
    t.int('sale_id')
    t.int('date')
    t.int('user_id')
    t.nullable.field('updated_on', { type: 'DateTime' })
    t.string('description')
    t.field('Contact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.Contact
      },
    })
  },
})
