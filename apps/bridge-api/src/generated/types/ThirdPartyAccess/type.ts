import { objectType } from 'nexus'

export const ThirdPartyAccess = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ThirdPartyAccess',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('company_name')
    t.string('email')
    t.int('passcode')
    t.string('first_name')
    t.string('last_name')
    t.string('logo')
    t.int('access_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
