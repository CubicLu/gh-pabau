import { objectType } from 'nexus'

export const ActivityUserFilters = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ActivityUserFilters',
  definition(t) {
    t.int('id')
    t.int('user_id')
    t.int('company_id')
    t.string('name')
    t.nullable.string('columns')
    t.nullable.string('data')
    t.boolean('shared')
    t.nullable.field('created_at', { type: 'DateTime' })
    t.nullable.field('updated_at', { type: 'DateTime' })
    t.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
