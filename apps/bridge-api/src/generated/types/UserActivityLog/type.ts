import { objectType } from 'nexus'

export const UserActivityLog = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'UserActivityLog',
  definition(t) {
    t.int('ID')
    t.nullable.int('userId')
    t.int('company_id')
    t.nullable.int('accessId')
    t.nullable.string('type')
    t.nullable.string('template')
    t.nullable.int('time')
    t.field('status', { type: 'user_activities_log_status' })
    t.nullable.int('ipAddress')
    t.nullable.int('pabau_annoucement')
    t.nullable.int('location_id')
    t.nullable.field('User', {
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
