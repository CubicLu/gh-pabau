import { queryField, nonNull } from 'nexus'

export const AppSubscriptionFindUniqueQuery = queryField(
  'findUniqueAppSubscription',
  {
    type: 'AppSubscription',
    args: {
      where: nonNull('AppSubscriptionWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.appSubscription.findUnique({
        where,
        ...select,
      })
    },
  },
)
