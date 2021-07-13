import { objectType } from 'nexus'

export const CompanyBranchAttachment = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CompanyBranchAttachment',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('location_id')
    t.field('type', { type: 'company_branches_attachments_type' })
    t.string('url')
    t.string('description')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('CompanyBranch', {
      type: 'CompanyBranch',
      resolve(root: any) {
        return root.CompanyBranch
      },
    })
  },
})
