import { objectType } from 'nexus'

export const CmCase = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmCase',
  definition(t) {
    t.int('id')
    t.string('case_number')
    t.nullable.string('type')
    t.nullable.string('contact')
    t.nullable.string('email')
    t.nullable.string('subject')
    t.nullable.string('phone')
    t.nullable.string('request')
    t.nullable.string('critical')
    t.nullable.string('description')
    t.nullable.int('related_to')
    t.nullable.int('module_type')
    t.nullable.int('user_id')
    t.nullable.int('module2_type')
    t.nullable.int('user2_id')
    t.nullable.int('ownerid')
    t.nullable.string('status')
    t.nullable.string('priority')
    t.nullable.string('reason')
    t.nullable.string('reported_by')
    t.nullable.string('comments')
    t.nullable.int('CreatedDate')
    t.nullable.string('IpAddress')
    t.nullable.int('company_id')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
