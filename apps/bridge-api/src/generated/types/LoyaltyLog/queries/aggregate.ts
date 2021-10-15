import { queryField, list } from 'nexus'

export const LoyaltyLogAggregateQuery = queryField('aggregateLoyaltyLog', {
  type: 'AggregateLoyaltyLog',
  args: {
    where: 'LoyaltyLogWhereInput',
    orderBy: list('LoyaltyLogOrderByInput'),
    cursor: 'LoyaltyLogWhereUniqueInput',
    distinct: 'LoyaltyLogScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.loyaltyLog.aggregate({ ...args, ...select }) as any
  },
})
