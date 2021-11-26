import { queryField, list } from 'nexus'

export const LoyaltyPointsFindFirstQuery = queryField(
  'findFirstLoyaltyPoints',
  {
    type: 'LoyaltyPoints',
    args: {
      where: 'LoyaltyPointsWhereInput',
      orderBy: list('LoyaltyPointsOrderByWithRelationInput'),
      cursor: 'LoyaltyPointsWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('LoyaltyPointsScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.loyaltyPoints.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
