import { queryField, nonNull, list } from 'nexus'

export const LoyaltyPointsFindManyQuery = queryField('findManyLoyaltyPoints', {
  type: nonNull(list(nonNull('LoyaltyPoints'))),
  args: {
    where: 'LoyaltyPointsWhereInput',
    orderBy: list('LoyaltyPointsOrderByInput'),
    cursor: 'LoyaltyPointsWhereUniqueInput',
    distinct: 'LoyaltyPointsScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.loyaltyPoints.findMany({
      ...args,
      ...select,
    })
  },
})
