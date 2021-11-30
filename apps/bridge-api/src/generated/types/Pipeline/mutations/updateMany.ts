import { mutationField, nonNull } from 'nexus'

export const PipelineUpdateManyMutation = mutationField('updateManyPipeline', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('PipelineUpdateManyMutationInput'),
    where: 'PipelineWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.pipeline.updateMany(args as any)
  },
})
