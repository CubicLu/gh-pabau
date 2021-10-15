import { queryField, nonNull, list } from 'nexus'

export const AppSubscriptionFindManyQuery = queryField(
  'findManyAppSubscription',
  {
    type: nonNull(list(nonNull('AppSubscription'))),
    args: {
      where: 'AppSubscriptionWhereInput',
      orderBy: list('AppSubscriptionOrderByInput'),
      cursor: 'AppSubscriptionWhereUniqueInput',
      distinct: 'AppSubscriptionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appSubscription.findMany({
        ...args,
        ...select,
      })
    },
  },
)
