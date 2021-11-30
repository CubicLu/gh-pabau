import { queryField, nonNull, list } from 'nexus'

export const RecallFindManyQuery = queryField('findManyRecall', {
  type: nonNull(list(nonNull('Recall'))),
  args: {
    where: 'RecallWhereInput',
    orderBy: list('RecallOrderByWithRelationInput'),
    cursor: 'RecallWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('RecallScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.recall.findMany({
      ...args,
      ...select,
    })
  },
})
