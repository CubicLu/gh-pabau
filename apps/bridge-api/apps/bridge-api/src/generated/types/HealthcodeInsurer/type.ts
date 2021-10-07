import { objectType } from 'nexus'

export const HealthcodeInsurer = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'HealthcodeInsurer',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('code')
    t.string('name')
    t.boolean('edi')
    t.boolean('me')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.list.field('InsuranceDetail', {
      type: 'InsuranceDetail',
      args: {
        where: 'InsuranceDetailWhereInput',
        orderBy: 'InsuranceDetailOrderByWithRelationInput',
        cursor: 'InsuranceDetailWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InsuranceDetailScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InsuranceDetail
      },
    })
    t.nullable.field('_count', {
      type: 'HealthcodeInsurerCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
