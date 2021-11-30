import { queryField, list } from 'nexus'

export const RecallFindFirstQuery = queryField('findFirstRecall', {
  type: 'Recall',
  args: {
    where: 'RecallWhereInput',
    orderBy: list('RecallOrderByWithRelationInput'),
    cursor: 'RecallWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('RecallScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.recall.findFirst({
      ...args,
      ...select,
    })
  },
})
