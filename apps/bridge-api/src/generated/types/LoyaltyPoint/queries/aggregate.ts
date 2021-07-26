import { queryField, list } from 'nexus'

export const LoyaltyPointAggregateQuery = queryField('aggregateLoyaltyPoint', {
  type: 'AggregateLoyaltyPoint',
  args: {
    where: 'LoyaltyPointWhereInput',
    orderBy: list('LoyaltyPointOrderByInput'),
    cursor: 'LoyaltyPointWhereUniqueInput',
    distinct: 'LoyaltyPointScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.loyaltyPoint.aggregate({ ...args, ...select }) as any
  },
})
