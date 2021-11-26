import { queryField, list } from 'nexus'

export const AppSubscriptionAggregateQuery = queryField(
  'aggregateAppSubscription',
  {
    type: 'AggregateAppSubscription',
    args: {
      where: 'AppSubscriptionWhereInput',
      orderBy: list('AppSubscriptionOrderByWithRelationInput'),
      cursor: 'AppSubscriptionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appSubscription.aggregate({ ...args, ...select }) as any
    },
  },
)
