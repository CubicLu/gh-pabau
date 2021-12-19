import { queryField, list } from 'nexus'

export const LoyaltyPointFindFirstQuery = queryField('findFirstLoyaltyPoint', {
  type: 'LoyaltyPoint',
  args: {
    where: 'LoyaltyPointWhereInput',
    orderBy: list('LoyaltyPointOrderByWithRelationInput'),
    cursor: 'LoyaltyPointWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('LoyaltyPointScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.loyaltyPoint.findFirst({
      ...args,
      ...select,
    })
  },
})
