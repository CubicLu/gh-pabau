import { queryField, list } from 'nexus'

export const LoyaltyPointFindFirstQuery = queryField('findFirstLoyaltyPoint', {
  type: 'LoyaltyPoint',
  args: {
    where: 'LoyaltyPointWhereInput',
    orderBy: list('LoyaltyPointOrderByInput'),
    cursor: 'LoyaltyPointWhereUniqueInput',
    distinct: 'LoyaltyPointScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.loyaltyPoint.findFirst({
      ...args,
      ...select,
    })
  },
})
