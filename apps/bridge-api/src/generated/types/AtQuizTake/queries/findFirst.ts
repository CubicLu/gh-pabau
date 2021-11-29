import { queryField, list } from 'nexus'

export const AtQuizTakeFindFirstQuery = queryField('findFirstAtQuizTake', {
  type: 'AtQuizTake',
  args: {
    where: 'AtQuizTakeWhereInput',
    orderBy: list('AtQuizTakeOrderByWithRelationInput'),
    cursor: 'AtQuizTakeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AtQuizTakeScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atQuizTake.findFirst({
      ...args,
      ...select,
    })
  },
})
