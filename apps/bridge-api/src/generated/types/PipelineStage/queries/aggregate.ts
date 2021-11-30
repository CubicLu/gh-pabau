import { queryField, list } from 'nexus'

export const PipelineStageAggregateQuery = queryField(
  'aggregatePipelineStage',
  {
    type: 'AggregatePipelineStage',
    args: {
      where: 'PipelineStageWhereInput',
      orderBy: list('PipelineStageOrderByWithRelationInput'),
      cursor: 'PipelineStageWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pipelineStage.aggregate({ ...args, ...select }) as any
    },
  },
)
