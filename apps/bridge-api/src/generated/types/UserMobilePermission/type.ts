import { objectType } from 'nexus'

export const UserMobilePermission = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'UserMobilePermission',
  definition(t) {
    t.int('id')
    t.int('uid')
    t.int('company_id')
    t.int('cal')
    t.int('reviews')
    t.int('reports')
    t.int('contacts')
    t.int('journey')
    t.int('register')
    t.boolean('dashboard')
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
