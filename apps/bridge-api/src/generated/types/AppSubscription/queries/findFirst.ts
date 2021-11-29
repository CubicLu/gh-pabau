import { queryField, list } from 'nexus'

export const AppSubscriptionFindFirstQuery = queryField(
  'findFirstAppSubscription',
  {
    type: 'AppSubscription',
    args: {
      where: 'AppSubscriptionWhereInput',
      orderBy: list('AppSubscriptionOrderByWithRelationInput'),
      cursor: 'AppSubscriptionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AppSubscriptionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appSubscription.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
