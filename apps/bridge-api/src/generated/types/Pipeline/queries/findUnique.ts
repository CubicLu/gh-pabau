import { queryField, nonNull } from 'nexus'

export const PipelineFindUniqueQuery = queryField('findUniquePipeline', {
  type: 'Pipeline',
  args: {
    where: nonNull('PipelineWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.pipeline.findUnique({
      where,
      ...select,
    })
  },
})
