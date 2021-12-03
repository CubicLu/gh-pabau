import { queryField, list } from 'nexus'

export const PipelineStageFindFirstQuery = queryField(
  'findFirstPipelineStage',
  {
    type: 'PipelineStage',
    args: {
      where: 'PipelineStageWhereInput',
      orderBy: list('PipelineStageOrderByWithRelationInput'),
      cursor: 'PipelineStageWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('PipelineStageScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pipelineStage.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
