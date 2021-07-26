import { queryField, nonNull, list } from 'nexus'

export const LoyaltyPointFindCountQuery = queryField(
  'findManyLoyaltyPointCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'LoyaltyPointWhereInput',
      orderBy: list('LoyaltyPointOrderByInput'),
      cursor: 'LoyaltyPointWhereUniqueInput',
      distinct: 'LoyaltyPointScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.loyaltyPoint.count(args as any)
    },
  },
)
