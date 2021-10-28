import { queryField, list } from 'nexus'

export const PipelineStageFindFirstQuery = queryField(
  'findFirstPipelineStage',
  {
    type: 'PipelineStage',
    args: {
      where: 'PipelineStageWhereInput',
      orderBy: list('PipelineStageOrderByWithRelationInput'),
      cursor: 'PipelineStageWhereUniqueInput',
      distinct: 'PipelineStageScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pipelineStage.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
