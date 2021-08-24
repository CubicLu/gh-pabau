import { objectType } from 'nexus'

export const CompanyNote = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CompanyNote',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('user_id')
    t.string('note')
    t.field('created_date', { type: 'DateTime' })
    t.boolean('is_alert')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
  },
})
