import { queryField, list } from 'nexus'

export const LoyaltyPointsFindFirstQuery = queryField(
  'findFirstLoyaltyPoints',
  {
    type: 'LoyaltyPoints',
    args: {
      where: 'LoyaltyPointsWhereInput',
      orderBy: list('LoyaltyPointsOrderByInput'),
      cursor: 'LoyaltyPointsWhereUniqueInput',
      distinct: 'LoyaltyPointsScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.loyaltyPoints.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
