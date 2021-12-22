import { queryField, nonNull, list } from 'nexus'

export const DiscountDisableUserFindCountQuery = queryField(
  'findManyDiscountDisableUserCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'DiscountDisableUserWhereInput',
      orderBy: list('DiscountDisableUserOrderByWithRelationInput'),
      cursor: 'DiscountDisableUserWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('DiscountDisableUserScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.discountDisableUser.count(args as any)
    },
  },
)
