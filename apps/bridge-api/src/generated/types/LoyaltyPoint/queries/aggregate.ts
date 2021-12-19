import { queryField, list } from 'nexus'

export const LoyaltyPointAggregateQuery = queryField('aggregateLoyaltyPoint', {
  type: 'AggregateLoyaltyPoint',
  args: {
    where: 'LoyaltyPointWhereInput',
    orderBy: list('LoyaltyPointOrderByWithRelationInput'),
    cursor: 'LoyaltyPointWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.loyaltyPoint.aggregate({ ...args, ...select }) as any
  },
})
