import { mutationField, nonNull } from 'nexus'

export const PipelineStageUpdateOneMutation = mutationField(
  'updateOnePipelineStage',
  {
    type: nonNull('PipelineStage'),
    args: {
      data: nonNull('PipelineStageUpdateInput'),
      where: nonNull('PipelineStageWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.pipelineStage.update({
        where,
        data,
        ...select,
      })
    },
  },
)
