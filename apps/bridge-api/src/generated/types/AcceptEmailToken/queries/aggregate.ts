import { queryField, list } from 'nexus'

export const AcceptEmailTokenAggregateQuery = queryField(
  'aggregateAcceptEmailToken',
  {
    type: 'AggregateAcceptEmailToken',
    args: {
      where: 'AcceptEmailTokenWhereInput',
      orderBy: list('AcceptEmailTokenOrderByWithRelationInput'),
      cursor: 'AcceptEmailTokenWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.acceptEmailToken.aggregate({ ...args, ...select }) as any
    },
  },
)
