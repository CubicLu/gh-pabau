import { queryField, nonNull, list } from 'nexus'

export const PipelineFindManyQuery = queryField('findManyPipeline', {
  type: nonNull(list(nonNull('Pipeline'))),
  args: {
    where: 'PipelineWhereInput',
    orderBy: list('PipelineOrderByWithRelationInput'),
    cursor: 'PipelineWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PipelineScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pipeline.findMany({
      ...args,
      ...select,
    })
  },
})
