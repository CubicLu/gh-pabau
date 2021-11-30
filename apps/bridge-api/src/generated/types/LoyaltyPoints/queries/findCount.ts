import { queryField, nonNull, list } from 'nexus'

export const LoyaltyPointsFindCountQuery = queryField(
  'findManyLoyaltyPointsCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'LoyaltyPointsWhereInput',
      orderBy: list('LoyaltyPointsOrderByWithRelationInput'),
      cursor: 'LoyaltyPointsWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('LoyaltyPointsScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.loyaltyPoints.count(args as any)
    },
  },
)
