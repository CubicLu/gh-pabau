import { queryField, nonNull, list } from 'nexus'

export const AtQuizTakeFindManyQuery = queryField('findManyAtQuizTake', {
  type: nonNull(list(nonNull('AtQuizTake'))),
  args: {
    where: 'AtQuizTakeWhereInput',
    orderBy: list('AtQuizTakeOrderByWithRelationInput'),
    cursor: 'AtQuizTakeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AtQuizTakeScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atQuizTake.findMany({
      ...args,
      ...select,
    })
  },
})
