import { queryField, list } from 'nexus'

export const AtQuizTakeAggregateQuery = queryField('aggregateAtQuizTake', {
  type: 'AggregateAtQuizTake',
  args: {
    where: 'AtQuizTakeWhereInput',
    orderBy: list('AtQuizTakeOrderByWithRelationInput'),
    cursor: 'AtQuizTakeWhereUniqueInput',
    distinct: 'AtQuizTakeScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atQuizTake.aggregate({ ...args, ...select }) as any
  },
})
