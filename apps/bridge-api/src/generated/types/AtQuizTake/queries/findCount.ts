import { queryField, nonNull, list } from 'nexus'

export const AtQuizTakeFindCountQuery = queryField('findManyAtQuizTakeCount', {
  type: nonNull('Int'),
  args: {
    where: 'AtQuizTakeWhereInput',
    orderBy: list('AtQuizTakeOrderByInput'),
    cursor: 'AtQuizTakeWhereUniqueInput',
    distinct: 'AtQuizTakeScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.atQuizTake.count(args as any)
  },
})
