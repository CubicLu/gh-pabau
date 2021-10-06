import { mutationField, nonNull } from 'nexus'

export const PipelineUpdateManyMutation = mutationField('updateManyPipeline', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'PipelineWhereInput',
    data: nonNull('PipelineUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.pipeline.updateMany(args as any)
  },
})
