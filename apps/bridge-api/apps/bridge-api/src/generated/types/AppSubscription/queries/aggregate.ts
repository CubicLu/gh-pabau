import { queryField, list } from 'nexus'

export const AppSubscriptionAggregateQuery = queryField(
  'aggregateAppSubscription',
  {
    type: 'AggregateAppSubscription',
    args: {
      where: 'AppSubscriptionWhereInput',
      orderBy: list('AppSubscriptionOrderByWithRelationInput'),
      cursor: 'AppSubscriptionWhereUniqueInput',
      distinct: 'AppSubscriptionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appSubscription.aggregate({ ...args, ...select }) as any
    },
  },
)
