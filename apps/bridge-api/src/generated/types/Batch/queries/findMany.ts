import { queryField, nonNull, list } from 'nexus'

export const BatchFindManyQuery = queryField('findManyBatch', {
  type: nonNull(list(nonNull('Batch'))),
  args: {
    where: 'BatchWhereInput',
    orderBy: list('BatchOrderByWithRelationInput'),
    cursor: 'BatchWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('BatchScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.batch.findMany({
      ...args,
      ...select,
    })
  },
})
