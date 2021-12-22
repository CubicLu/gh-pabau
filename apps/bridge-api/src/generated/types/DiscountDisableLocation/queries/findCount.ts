import { queryField, nonNull, list } from 'nexus'

export const DiscountDisableLocationFindCountQuery = queryField(
  'findManyDiscountDisableLocationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'DiscountDisableLocationWhereInput',
      orderBy: list('DiscountDisableLocationOrderByWithRelationInput'),
      cursor: 'DiscountDisableLocationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('DiscountDisableLocationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.discountDisableLocation.count(args as any)
    },
  },
)
