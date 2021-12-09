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
    t.nullable.string('reference')
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
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('_count', {
      type: 'PipelineCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
