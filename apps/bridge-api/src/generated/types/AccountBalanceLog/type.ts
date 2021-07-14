import { objectType } from 'nexus'

export const AccountBalanceLog = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AccountBalanceLog',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('contact_id')
    t.int('insurance_company_id')
    t.float('amount')
    t.int('date_time')
    t.nullable.int('product_id')
    t.string('description')
    t.int('sale_id')
    t.int('referral_id')
    t.int('imported')
    t.int('ref_sale_id')
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
  },
})
