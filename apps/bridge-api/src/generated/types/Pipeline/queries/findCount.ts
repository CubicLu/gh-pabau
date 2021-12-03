import { queryField, nonNull, list } from 'nexus'

export const PipelineFindCountQuery = queryField('findManyPipelineCount', {
  type: nonNull('Int'),
  args: {
    where: 'PipelineWhereInput',
    orderBy: list('PipelineOrderByWithRelationInput'),
    cursor: 'PipelineWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PipelineScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.pipeline.count(args as any)
  },
})
