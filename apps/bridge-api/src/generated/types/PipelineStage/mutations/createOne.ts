import { mutationField, nonNull } from 'nexus'

export const PipelineStageCreateOneMutation = mutationField(
  'createOnePipelineStage',
  {
    type: nonNull('PipelineStage'),
    args: {
      data: nonNull('PipelineStageCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.pipelineStage.create({
        data,
        ...select,
      })
    },
  },
)
