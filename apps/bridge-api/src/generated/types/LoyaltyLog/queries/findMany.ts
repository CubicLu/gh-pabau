import { queryField, nonNull, list } from 'nexus'

export const LoyaltyLogFindManyQuery = queryField('findManyLoyaltyLog', {
  type: nonNull(list(nonNull('LoyaltyLog'))),
  args: {
    where: 'LoyaltyLogWhereInput',
    orderBy: list('LoyaltyLogOrderByWithRelationInput'),
    cursor: 'LoyaltyLogWhereUniqueInput',
    distinct: 'LoyaltyLogScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.loyaltyLog.findMany({
      ...args,
      ...select,
    })
  },
})
