import { mutationField, nonNull } from 'nexus'

export const PipelineStageUpdateManyMutation = mutationField(
  'updateManyPipelineStage',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'PipelineStageWhereInput',
      data: nonNull('PipelineStageUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pipelineStage.updateMany(args as any)
    },
  },
)
