import { queryField, nonNull, list } from 'nexus'

export const AppSubscriptionFindCountQuery = queryField(
  'findManyAppSubscriptionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AppSubscriptionWhereInput',
      orderBy: list('AppSubscriptionOrderByWithRelationInput'),
      cursor: 'AppSubscriptionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AppSubscriptionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.appSubscription.count(args as any)
    },
  },
)
