import { mutationField, nonNull } from 'nexus'

export const PipelineStageUpdateOneMutation = mutationField(
  'updateOnePipelineStage',
  {
    type: nonNull('PipelineStage'),
    args: {
      where: nonNull('PipelineStageWhereUniqueInput'),
      data: nonNull('PipelineStageUpdateInput'),
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
