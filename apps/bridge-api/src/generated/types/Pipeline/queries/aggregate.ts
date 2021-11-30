import { queryField, list } from 'nexus'

export const PipelineAggregateQuery = queryField('aggregatePipeline', {
  type: 'AggregatePipeline',
  args: {
    where: 'PipelineWhereInput',
    orderBy: list('PipelineOrderByWithRelationInput'),
    cursor: 'PipelineWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pipeline.aggregate({ ...args, ...select }) as any
  },
})
