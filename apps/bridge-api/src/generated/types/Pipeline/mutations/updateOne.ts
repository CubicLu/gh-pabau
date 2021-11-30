import { mutationField, nonNull } from 'nexus'

export const PipelineUpdateOneMutation = mutationField('updateOnePipeline', {
  type: nonNull('Pipeline'),
  args: {
    data: nonNull('PipelineUpdateInput'),
    where: nonNull('PipelineWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.pipeline.update({
      where,
      data,
      ...select,
    })
  },
})
