import { objectType } from 'nexus'

export const ContactInsurance = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ContactInsurance',
  definition(t) {
    t.int('id')
    t.int('contact_id')
    t.int('provider_number')
    t.string('auth_code')
    t.string('membership_number')
    t.string('charge_type')
    t.int('company_id')
    t.int('imported')
    t.nullable.field('CmContact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.CmContact
      },
    })
    t.list.field('InsuranceContractPrice', {
      type: 'InsuranceContractPrice',
      args: {
        where: 'InsuranceContractPriceWhereInput',
        orderBy: 'InsuranceContractPriceOrderByWithRelationInput',
        cursor: 'InsuranceContractPriceWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InsuranceContractPriceScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InsuranceContractPrice
      },
    })
    t.field('_count', {
      type: 'ContactInsuranceCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
