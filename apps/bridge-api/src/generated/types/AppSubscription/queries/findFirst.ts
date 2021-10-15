import { queryField, list } from 'nexus'

export const AppSubscriptionFindFirstQuery = queryField(
  'findFirstAppSubscription',
  {
    type: 'AppSubscription',
    args: {
      where: 'AppSubscriptionWhereInput',
      orderBy: list('AppSubscriptionOrderByInput'),
      cursor: 'AppSubscriptionWhereUniqueInput',
      distinct: 'AppSubscriptionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appSubscription.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
