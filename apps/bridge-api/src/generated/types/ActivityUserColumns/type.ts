import { objectType } from 'nexus'

export const ActivityUserColumns = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ActivityUserColumns',
  definition(t) {
    t.int('id')
    t.int('user_id')
    t.string('columns')
    t.int('company_id')
    t.field('Company', {
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
