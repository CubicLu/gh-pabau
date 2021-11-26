import { queryField, list } from 'nexus'

export const LoyaltyLogAggregateQuery = queryField('aggregateLoyaltyLog', {
  type: 'AggregateLoyaltyLog',
  args: {
    where: 'LoyaltyLogWhereInput',
    orderBy: list('LoyaltyLogOrderByWithRelationInput'),
    cursor: 'LoyaltyLogWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.loyaltyLog.aggregate({ ...args, ...select }) as any
  },
})
