import { queryField, nonNull, list } from 'nexus'

export const AppSubscriptionFindManyQuery = queryField(
  'findManyAppSubscription',
  {
    type: nonNull(list(nonNull('AppSubscription'))),
    args: {
      where: 'AppSubscriptionWhereInput',
      orderBy: list('AppSubscriptionOrderByWithRelationInput'),
      cursor: 'AppSubscriptionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AppSubscriptionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appSubscription.findMany({
        ...args,
        ...select,
      })
    },
  },
)
