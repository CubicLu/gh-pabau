import { queryField, list } from 'nexus'

export const AcceptEmailTokenAggregateQuery = queryField(
  'aggregateAcceptEmailToken',
  {
    type: 'AggregateAcceptEmailToken',
    args: {
      where: 'AcceptEmailTokenWhereInput',
      orderBy: list('AcceptEmailTokenOrderByInput'),
      cursor: 'AcceptEmailTokenWhereUniqueInput',
      distinct: 'AcceptEmailTokenScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.acceptEmailToken.aggregate({ ...args, ...select }) as any
    },
  },
)
