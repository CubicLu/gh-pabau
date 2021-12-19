import { queryField, nonNull, list } from 'nexus'

export const LoyaltyPointFindCountQuery = queryField(
  'findManyLoyaltyPointCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'LoyaltyPointWhereInput',
      orderBy: list('LoyaltyPointOrderByWithRelationInput'),
      cursor: 'LoyaltyPointWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('LoyaltyPointScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.loyaltyPoint.count(args as any)
    },
  },
)
