import { queryField, nonNull, list } from 'nexus'

export const LoyaltyPointsFindManyQuery = queryField('findManyLoyaltyPoints', {
  type: nonNull(list(nonNull('LoyaltyPoints'))),
  args: {
    where: 'LoyaltyPointsWhereInput',
    orderBy: list('LoyaltyPointsOrderByWithRelationInput'),
    cursor: 'LoyaltyPointsWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('LoyaltyPointsScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.loyaltyPoints.findMany({
      ...args,
      ...select,
    })
  },
})
