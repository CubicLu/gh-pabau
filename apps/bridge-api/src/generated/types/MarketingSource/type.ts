import { objectType } from 'nexus'

export const MarketingSource = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'MarketingSource',
  definition(t) {
    t.int('id')
    t.string('name')
    t.int('company_id')
    t.int('custom_id')
    t.boolean('public')
    t.int('imported')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.list.field('CmExtraPatient', {
      type: 'CmExtraPatient',
      args: {
        where: 'CmExtraPatientWhereInput',
        orderBy: 'CmExtraPatientOrderByWithRelationInput',
        cursor: 'CmExtraPatientWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmExtraPatientScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmExtraPatient
      },
    })
    t.nullable.field('_count', {
      type: 'MarketingSourceCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
