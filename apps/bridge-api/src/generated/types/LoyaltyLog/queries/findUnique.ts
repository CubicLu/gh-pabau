import { queryField, nonNull } from 'nexus'

export const LoyaltyLogFindUniqueQuery = queryField('findUniqueLoyaltyLog', {
  type: 'LoyaltyLog',
  args: {
    where: nonNull('LoyaltyLogWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.loyaltyLog.findUnique({
      where,
      ...select,
    })
  },
})
