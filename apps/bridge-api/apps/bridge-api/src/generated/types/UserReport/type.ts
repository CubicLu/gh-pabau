import { objectType } from 'nexus'

export const UserReport = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'UserReport',
  definition(t) {
    t.int('id')
    t.nullable.int('company_id')
    t.nullable.int('user_id')
    t.nullable.int('report_id')
    t.boolean('favorite')
    t.nullable.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('Report', {
      type: 'Report',
      resolve(root: any) {
        return root.Report
      },
    })
  },
})
