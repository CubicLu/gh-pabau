import { objectType } from 'nexus'

export const CmExtraPatient = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmExtraPatient',
  definition(t) {
    t.int('id')
    t.int('contact_id')
    t.int('nhs_number')
    t.string('gp')
    t.string('surgeon')
    t.int('company_id')
    t.string('date_of_death')
    t.string('external_clinic')
    t.string('assigned_clinic')
    t.int('treatment_group')
    t.int('assigned_diary')
    t.int('marketing_source')
    t.int('referral_source')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('CmContact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.CmContact
      },
    })
    t.field('MarketingSource', {
      type: 'MarketingSource',
      resolve(root: any) {
        return root.MarketingSource
      },
    })
  },
})
