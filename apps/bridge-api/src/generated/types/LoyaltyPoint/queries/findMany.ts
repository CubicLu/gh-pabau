import { queryField, nonNull, list } from 'nexus'

export const LoyaltyPointFindManyQuery = queryField('findManyLoyaltyPoint', {
  type: nonNull(list(nonNull('LoyaltyPoint'))),
  args: {
    where: 'LoyaltyPointWhereInput',
    orderBy: list('LoyaltyPointOrderByInput'),
    cursor: 'LoyaltyPointWhereUniqueInput',
    distinct: 'LoyaltyPointScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.loyaltyPoint.findMany({
      ...args,
      ...select,
    })
  },
})
