import { queryField, list } from 'nexus'

export const PipelineStageAggregateQuery = queryField(
  'aggregatePipelineStage',
  {
    type: 'AggregatePipelineStage',
    args: {
      where: 'PipelineStageWhereInput',
      orderBy: list('PipelineStageOrderByWithRelationInput'),
      cursor: 'PipelineStageWhereUniqueInput',
      distinct: 'PipelineStageScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pipelineStage.aggregate({ ...args, ...select }) as any
    },
  },
)
