import { objectType } from 'nexus'

export const Pipeline = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Pipeline',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('name')
    t.string('description')
    t.int('status')
    t.string('services_ids')
    t.string('note')
    t.boolean('restrict_stages')
    t.list.field('LeadStatus', {
      type: 'LeadStatus',
      args: {
        where: 'LeadStatusWhereInput',
        orderBy: 'LeadStatusOrderByWithRelationInput',
        cursor: 'LeadStatusWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'LeadStatusScalarFieldEnum',
      },
      resolve(root: any) {
        return root.LeadStatus
      },
    })
    t.nullable.field('_count', {
      type: 'PipelineCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
