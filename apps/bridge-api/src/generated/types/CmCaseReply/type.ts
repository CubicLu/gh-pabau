import { objectType } from 'nexus'

export const CmCaseReply = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmCaseReply',
  definition(t) {
    t.int('ID')
    t.int('OwnerID')
    t.int('CaseID')
    t.string('Description')
    t.field('CreatedDate', { type: 'DateTime' })
    t.int('IpAddress')
    t.nullable.int('company_id')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
