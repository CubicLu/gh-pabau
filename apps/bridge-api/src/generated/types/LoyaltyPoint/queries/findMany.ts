import { queryField, nonNull, list } from 'nexus'

export const LoyaltyPointFindManyQuery = queryField('findManyLoyaltyPoint', {
  type: nonNull(list(nonNull('LoyaltyPoint'))),
  args: {
    where: 'LoyaltyPointWhereInput',
    orderBy: list('LoyaltyPointOrderByWithRelationInput'),
    cursor: 'LoyaltyPointWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('LoyaltyPointScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.loyaltyPoint.findMany({
      ...args,
      ...select,
    })
  },
})
