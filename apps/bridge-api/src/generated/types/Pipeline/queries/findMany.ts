import { queryField, nonNull, list } from 'nexus'

export const PipelineFindManyQuery = queryField('findManyPipeline', {
  type: nonNull(list(nonNull('Pipeline'))),
  args: {
    where: 'PipelineWhereInput',
    orderBy: list('PipelineOrderByWithRelationInput'),
    cursor: 'PipelineWhereUniqueInput',
    distinct: 'PipelineScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pipeline.findMany({
      ...args,
      ...select,
    })
  },
})
