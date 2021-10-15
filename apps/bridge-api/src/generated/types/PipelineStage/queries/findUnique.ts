import { queryField, nonNull } from 'nexus'

export const PipelineStageFindUniqueQuery = queryField(
  'findUniquePipelineStage',
  {
    type: 'PipelineStage',
    args: {
      where: nonNull('PipelineStageWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.pipelineStage.findUnique({
        where,
        ...select,
      })
    },
  },
)
