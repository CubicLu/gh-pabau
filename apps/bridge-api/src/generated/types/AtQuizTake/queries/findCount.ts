import { queryField, nonNull, list } from 'nexus'

export const AtQuizTakeFindCountQuery = queryField('findManyAtQuizTakeCount', {
  type: nonNull('Int'),
  args: {
    where: 'AtQuizTakeWhereInput',
    orderBy: list('AtQuizTakeOrderByWithRelationInput'),
    cursor: 'AtQuizTakeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AtQuizTakeScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.atQuizTake.count(args as any)
  },
})
