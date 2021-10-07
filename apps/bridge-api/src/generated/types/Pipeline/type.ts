import { objectType } from 'nexus'

export const Pipeline = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Pipeline',
  definition(t) {
    t.int('id')
    t.nullable.int('company_id')
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
    t.list.field('PipelineStage', {
      type: 'PipelineStage',
      args: {
        where: 'PipelineStageWhereInput',
        orderBy: 'PipelineStageOrderByWithRelationInput',
        cursor: 'PipelineStageWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PipelineStageScalarFieldEnum',
      },
      resolve(root: any) {
        return root.PipelineStage
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
