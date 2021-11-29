import { queryField, list } from 'nexus'

export const PipelineFindFirstQuery = queryField('findFirstPipeline', {
  type: 'Pipeline',
  args: {
    where: 'PipelineWhereInput',
    orderBy: list('PipelineOrderByWithRelationInput'),
    cursor: 'PipelineWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PipelineScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pipeline.findFirst({
      ...args,
      ...select,
    })
  },
})
