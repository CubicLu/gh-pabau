import { queryField, nonNull, list } from 'nexus'

export const LoyaltyPointsFindCountQuery = queryField(
  'findManyLoyaltyPointsCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'LoyaltyPointsWhereInput',
      orderBy: list('LoyaltyPointsOrderByWithRelationInput'),
      cursor: 'LoyaltyPointsWhereUniqueInput',
      distinct: 'LoyaltyPointsScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.loyaltyPoints.count(args as any)
    },
  },
)
