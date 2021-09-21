import { objectType } from 'nexus'

export const LeadStatus = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'LeadStatus',
  definition(t) {
    t.int('id')
    t.nullable.int('company_id')
    t.string('status_name')
    t.int('status_order')
    t.int('email_template_id')
    t.string('email_template_from')
    t.int('is_default')
    t.int('is_convert')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
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
    t.nullable.field('_count', {
      type: 'LeadStatusCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
