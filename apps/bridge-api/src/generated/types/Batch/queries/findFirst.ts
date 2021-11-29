import { queryField, list } from 'nexus'

export const BatchFindFirstQuery = queryField('findFirstBatch', {
  type: 'Batch',
  args: {
    where: 'BatchWhereInput',
    orderBy: list('BatchOrderByWithRelationInput'),
    cursor: 'BatchWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('BatchScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.batch.findFirst({
      ...args,
      ...select,
    })
  },
})
