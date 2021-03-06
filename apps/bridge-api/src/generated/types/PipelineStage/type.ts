import { objectType } from 'nexus'

export const PipelineStage = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'PipelineStage',
  definition(t) {
    t.int('id')
    t.int('company_id')
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
    t.field('Company', {
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
    t.field('_count', {
      type: 'PipelineStageCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
