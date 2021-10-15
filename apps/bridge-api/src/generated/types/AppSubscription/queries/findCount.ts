import { queryField, nonNull, list } from 'nexus'

export const AppSubscriptionFindCountQuery = queryField(
  'findManyAppSubscriptionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AppSubscriptionWhereInput',
      orderBy: list('AppSubscriptionOrderByInput'),
      cursor: 'AppSubscriptionWhereUniqueInput',
      distinct: 'AppSubscriptionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.appSubscription.count(args as any)
    },
  },
)
