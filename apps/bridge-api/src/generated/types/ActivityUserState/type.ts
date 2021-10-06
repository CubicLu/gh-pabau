import { objectType } from 'nexus'

export const ActivityUserState = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ActivityUserState',
  definition(t) {
    t.int('id')
    t.int('user_id')
    t.nullable.string('columns')
    t.int('company_id')
    t.nullable.int('user_filter')
    t.nullable.int('user_group_filter')
    t.nullable.int('custom_filter')
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
    t.nullable.field('ActivityUserFilters', {
      type: 'ActivityUserFilters',
      resolve(root: any) {
        return root.ActivityUserFilters
      },
    })
  },
})
