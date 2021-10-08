import { objectType } from 'nexus'

export const PipelineStage = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'PipelineStage',
  definition(t) {
    t.int('id')
    t.nullable.int('company_id')
    t.nullable.int('pipeline_id')
    t.string('name')
    t.int('stage_order')
    t.string('custom_field_ids')
    t.string('note')
    t.field('created_date', { type: 'DateTime' })
    t.field('updated_date', { type: 'DateTime' })
    t.nullable.field('Pipeline', {
      type: 'Pipeline',
      resolve(root: any) {
        return root.Pipeline
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
      type: 'PipelineStageCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
