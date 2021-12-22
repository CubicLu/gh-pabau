import { queryField, nonNull, list } from 'nexus'

export const DiscountDisableLocationFindManyQuery = queryField(
  'findManyDiscountDisableLocation',
  {
    type: nonNull(list(nonNull('DiscountDisableLocation'))),
    args: {
      where: 'DiscountDisableLocationWhereInput',
      orderBy: list('DiscountDisableLocationOrderByWithRelationInput'),
      cursor: 'DiscountDisableLocationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('DiscountDisableLocationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.discountDisableLocation.findMany({
        ...args,
        ...select,
      })
    },
  },
)
