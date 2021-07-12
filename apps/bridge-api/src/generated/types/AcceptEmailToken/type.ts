import { objectType } from 'nexus'

export const AcceptEmailToken = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AcceptEmailToken',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('email')
    t.int('token')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
