import { mutationField, nonNull } from 'nexus'

export const PipelineUpdateOneMutation = mutationField('updateOnePipeline', {
  type: nonNull('Pipeline'),
  args: {
    where: nonNull('PipelineWhereUniqueInput'),
    data: nonNull('PipelineUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.pipeline.update({
      where,
      data,
      ...select,
    })
  },
})
