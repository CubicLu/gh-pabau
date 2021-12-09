import { objectType } from 'nexus'

export const InsuranceDetail = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'InsuranceDetail',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('insurer_name')
    t.string('phone')
    t.string('website')
    t.string('city')
    t.string('street')
    t.string('county')
    t.string('post_code')
    t.string('email')
    t.int('is_active')
    t.string('image')
    t.string('country')
    t.string('street2')
    t.string('provider_no')
    t.int('imported')
    t.nullable.int('healthcode_id')
    t.int('cycle_quantity')
    t.int('custom_id')
    t.string('company_type')
    t.string('hc_identifier')
    t.nullable.string('xero_contact_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('HealthcodeInsurer', {
      type: 'HealthcodeInsurer',
      resolve(root: any) {
        return root.HealthcodeInsurer
      },
    })
    t.nullable.field('CmContact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.CmContact
      },
    })
    t.list.field('InvSale', {
      type: 'InvSale',
      args: {
        where: 'InvSaleWhereInput',
        orderBy: 'InvSaleOrderByWithRelationInput',
        cursor: 'InvSaleWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvSaleScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvSale
      },
    })
    t.field('_count', {
      type: 'InsuranceDetailCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
