import { queryField, list } from 'nexus'

export const LoyaltyPointsAggregateQuery = queryField(
  'aggregateLoyaltyPoints',
  {
    type: 'AggregateLoyaltyPoints',
    args: {
      where: 'LoyaltyPointsWhereInput',
      orderBy: list('LoyaltyPointsOrderByWithRelationInput'),
      cursor: 'LoyaltyPointsWhereUniqueInput',
      distinct: 'LoyaltyPointsScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.loyaltyPoints.aggregate({ ...args, ...select }) as any
    },
  },
)
