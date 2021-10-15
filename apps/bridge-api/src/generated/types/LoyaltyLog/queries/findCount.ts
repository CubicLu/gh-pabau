import { queryField, nonNull, list } from 'nexus'

export const LoyaltyLogFindCountQuery = queryField('findManyLoyaltyLogCount', {
  type: nonNull('Int'),
  args: {
    where: 'LoyaltyLogWhereInput',
    orderBy: list('LoyaltyLogOrderByInput'),
    cursor: 'LoyaltyLogWhereUniqueInput',
    distinct: 'LoyaltyLogScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.loyaltyLog.count(args as any)
  },
})
