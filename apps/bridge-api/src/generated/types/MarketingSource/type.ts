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
    t.list.field('CmLead', {
      type: 'CmLead',
      args: {
        where: 'CmLeadWhereInput',
        orderBy: 'CmLeadOrderByWithRelationInput',
        cursor: 'CmLeadWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmLeadScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmLead
      },
    })
    t.list.field('CmContact', {
      type: 'CmContact',
      args: {
        where: 'CmContactWhereInput',
        orderBy: 'CmContactOrderByWithRelationInput',
        cursor: 'CmContactWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContact
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
