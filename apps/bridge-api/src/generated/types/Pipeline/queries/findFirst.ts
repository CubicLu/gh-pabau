import { queryField, list } from 'nexus'

export const PipelineFindFirstQuery = queryField('findFirstPipeline', {
  type: 'Pipeline',
  args: {
    where: 'PipelineWhereInput',
    orderBy: list('PipelineOrderByWithRelationInput'),
    cursor: 'PipelineWhereUniqueInput',
    distinct: 'PipelineScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pipeline.findFirst({
      ...args,
      ...select,
    })
  },
})
