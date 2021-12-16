import { objectType } from 'nexus'

export const LoyaltyPointSettings = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'LoyaltyPointSettings',
  definition(t) {
    t.int('id')
    t.nullable.int('company_id')
    t.nullable.int('user_id')
    t.nullable.int('status')
    t.nullable.float('amount')
    t.nullable.field('created_date', { type: 'DateTime' })
    t.nullable.field('modified_date', { type: 'DateTime' })
    t.float('points_value')
    t.int('show_on_receipt')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
  },
})
