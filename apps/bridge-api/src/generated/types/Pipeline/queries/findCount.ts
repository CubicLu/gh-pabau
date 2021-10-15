import { queryField, nonNull, list } from 'nexus'

export const PipelineFindCountQuery = queryField('findManyPipelineCount', {
  type: nonNull('Int'),
  args: {
    where: 'PipelineWhereInput',
    orderBy: list('PipelineOrderByInput'),
    cursor: 'PipelineWhereUniqueInput',
    distinct: 'PipelineScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.pipeline.count(args as any)
  },
})
