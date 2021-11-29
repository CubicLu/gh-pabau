import { queryField, nonNull, list } from 'nexus'

export const BatchFindCountQuery = queryField('findManyBatchCount', {
  type: nonNull('Int'),
  args: {
    where: 'BatchWhereInput',
    orderBy: list('BatchOrderByWithRelationInput'),
    cursor: 'BatchWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('BatchScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.batch.count(args as any)
  },
})
