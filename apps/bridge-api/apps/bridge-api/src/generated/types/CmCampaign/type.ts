import { objectType } from 'nexus'

export const CmCampaign = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmCampaign',
  definition(t) {
    t.int('ID')
    t.string('OwnerID')
    t.string('CompaignName')
    t.int('Type')
    t.int('Status')
    t.nullable.string('StartDate')
    t.nullable.string('EndDate')
    t.string('ExpectedRevenue')
    t.string('BudgetedCost')
    t.string('ActualCost')
    t.string('ExpectedResponse')
    t.string('NumSent')
    t.string('Description')
    t.nullable.string('CreatedDate')
    t.int('IpAddress')
    t.int('company_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
