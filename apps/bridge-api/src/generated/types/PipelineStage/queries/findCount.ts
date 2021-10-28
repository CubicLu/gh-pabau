import { queryField, nonNull, list } from 'nexus'

export const PipelineStageFindCountQuery = queryField(
  'findManyPipelineStageCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'PipelineStageWhereInput',
      orderBy: list('PipelineStageOrderByWithRelationInput'),
      cursor: 'PipelineStageWhereUniqueInput',
      distinct: 'PipelineStageScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pipelineStage.count(args as any)
    },
  },
)
