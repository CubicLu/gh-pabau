import { queryField, list } from 'nexus'

export const LoyaltyLogFindFirstQuery = queryField('findFirstLoyaltyLog', {
  type: 'LoyaltyLog',
  args: {
    where: 'LoyaltyLogWhereInput',
    orderBy: list('LoyaltyLogOrderByWithRelationInput'),
    cursor: 'LoyaltyLogWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('LoyaltyLogScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.loyaltyLog.findFirst({
      ...args,
      ...select,
    })
  },
})
