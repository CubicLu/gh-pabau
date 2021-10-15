import { queryField, list } from 'nexus'

export const BatchFindFirstQuery = queryField('findFirstBatch', {
  type: 'Batch',
  args: {
    where: 'BatchWhereInput',
    orderBy: list('BatchOrderByInput'),
    cursor: 'BatchWhereUniqueInput',
    distinct: 'BatchScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.batch.findFirst({
      ...args,
      ...select,
    })
  },
})
