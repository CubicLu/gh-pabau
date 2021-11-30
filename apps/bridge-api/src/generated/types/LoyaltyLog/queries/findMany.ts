import { queryField, nonNull, list } from 'nexus'

export const LoyaltyLogFindManyQuery = queryField('findManyLoyaltyLog', {
  type: nonNull(list(nonNull('LoyaltyLog'))),
  args: {
    where: 'LoyaltyLogWhereInput',
    orderBy: list('LoyaltyLogOrderByWithRelationInput'),
    cursor: 'LoyaltyLogWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('LoyaltyLogScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.loyaltyLog.findMany({
      ...args,
      ...select,
    })
  },
})
