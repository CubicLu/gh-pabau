import { mutationField, nonNull } from 'nexus'

export const PipelineCreateOneMutation = mutationField('createOnePipeline', {
  type: nonNull('Pipeline'),
  args: {
    data: nonNull('PipelineCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.pipeline.create({
      data,
      ...select,
    })
  },
})
