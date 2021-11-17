import { queryField, list } from 'nexus'

export const RecallFindFirstQuery = queryField('findFirstRecall', {
  type: 'Recall',
  args: {
    where: 'RecallWhereInput',
    orderBy: list('RecallOrderByWithRelationInput'),
    cursor: 'RecallWhereUniqueInput',
    distinct: 'RecallScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.recall.findFirst({
      ...args,
      ...select,
    })
  },
})
