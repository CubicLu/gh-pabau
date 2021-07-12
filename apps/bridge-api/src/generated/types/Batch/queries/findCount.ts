import { queryField, nonNull, list } from 'nexus'

export const BatchFindCountQuery = queryField('findManyBatchCount', {
  type: nonNull('Int'),
  args: {
    where: 'BatchWhereInput',
    orderBy: list('BatchOrderByInput'),
    cursor: 'BatchWhereUniqueInput',
    distinct: 'BatchScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.batch.count(args as any)
  },
})
