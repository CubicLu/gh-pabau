import { queryField, nonNull, list } from 'nexus'

export const PipelineStageFindCountQuery = queryField(
  'findManyPipelineStageCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'PipelineStageWhereInput',
      orderBy: list('PipelineStageOrderByWithRelationInput'),
      cursor: 'PipelineStageWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('PipelineStageScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pipelineStage.count(args as any)
    },
  },
)
