import { objectType } from 'nexus'

export const TwoFactorHistory = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'TwoFactorHistory',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('passcode')
    t.int('user_id')
    t.field('request_date', { type: 'DateTime' })
    t.int('is_confirmed')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
