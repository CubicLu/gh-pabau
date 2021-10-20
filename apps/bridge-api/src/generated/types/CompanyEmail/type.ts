import { objectType } from 'nexus'

export const CompanyEmail = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CompanyEmail',
  definition(t) {
    t.int('company_id')
    t.string('company_email')
    t.string('added_by')
    t.int('email_id')
    t.string('senders_name')
    t.int('confirmed')
    t.string('hash')
    t.int('default_email')
    t.int('enterprise_email')
    t.string('merge_tags')
    t.int('visibility')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
