import { queryField, list } from 'nexus'

export const LoyaltyLogFindFirstQuery = queryField('findFirstLoyaltyLog', {
  type: 'LoyaltyLog',
  args: {
    where: 'LoyaltyLogWhereInput',
    orderBy: list('LoyaltyLogOrderByInput'),
    cursor: 'LoyaltyLogWhereUniqueInput',
    distinct: 'LoyaltyLogScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.loyaltyLog.findFirst({
      ...args,
      ...select,
    })
  },
})
