import { mutationField, nonNull } from 'nexus'

export const PipelineStageDeleteOneMutation = mutationField(
  'deleteOnePipelineStage',
  {
    type: 'PipelineStage',
    args: {
      where: nonNull('PipelineStageWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.pipelineStage.delete({
        where,
        ...select,
      })
    },
  },
)
