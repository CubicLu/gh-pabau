import { mutationField, nonNull } from 'nexus'

export const PipelineStageUpdateManyMutation = mutationField(
  'updateManyPipelineStage',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('PipelineStageUpdateManyMutationInput'),
      where: 'PipelineStageWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pipelineStage.updateMany(args as any)
    },
  },
)
