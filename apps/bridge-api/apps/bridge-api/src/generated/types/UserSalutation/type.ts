import { objectType } from 'nexus'

export const UserSalutation = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'UserSalutation',
  definition(t) {
    t.int('id')
    t.string('name')
    t.nullable.int('company_id')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
