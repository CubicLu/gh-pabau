import { mutationField, nonNull } from 'nexus'

export const PipelineDeleteOneMutation = mutationField('deleteOnePipeline', {
  type: 'Pipeline',
  args: {
    where: nonNull('PipelineWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.pipeline.delete({
      where,
      ...select,
    })
  },
})
