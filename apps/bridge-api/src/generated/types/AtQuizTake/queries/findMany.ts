import { queryField, nonNull, list } from 'nexus'

export const AtQuizTakeFindManyQuery = queryField('findManyAtQuizTake', {
  type: nonNull(list(nonNull('AtQuizTake'))),
  args: {
    where: 'AtQuizTakeWhereInput',
    orderBy: list('AtQuizTakeOrderByInput'),
    cursor: 'AtQuizTakeWhereUniqueInput',
    distinct: 'AtQuizTakeScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atQuizTake.findMany({
      ...args,
      ...select,
    })
  },
})
