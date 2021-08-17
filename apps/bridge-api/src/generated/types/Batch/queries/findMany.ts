import { queryField, nonNull, list } from 'nexus'

export const BatchFindManyQuery = queryField('findManyBatch', {
  type: nonNull(list(nonNull('Batch'))),
  args: {
    where: 'BatchWhereInput',
    orderBy: list('BatchOrderByInput'),
    cursor: 'BatchWhereUniqueInput',
    distinct: 'BatchScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.batch.findMany({
      ...args,
      ...select,
    })
  },
})
