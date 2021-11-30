import { queryField, nonNull, list } from 'nexus'

export const LoyaltyLogFindCountQuery = queryField('findManyLoyaltyLogCount', {
  type: nonNull('Int'),
  args: {
    where: 'LoyaltyLogWhereInput',
    orderBy: list('LoyaltyLogOrderByWithRelationInput'),
    cursor: 'LoyaltyLogWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('LoyaltyLogScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.loyaltyLog.count(args as any)
  },
})
