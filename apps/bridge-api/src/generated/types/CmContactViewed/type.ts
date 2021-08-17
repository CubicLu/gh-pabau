import { objectType } from 'nexus'

export const CmContactViewed = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmContactViewed',
  definition(t) {
    t.int('id')
    t.int('contact_id')
    t.int('user_id')
    t.int('company_id')
    t.field('date', { type: 'DateTime' })
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
    t.field('CmContact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.CmContact
      },
    })
  },
})
