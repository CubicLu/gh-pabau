import { queryField, list } from 'nexus'

export const DiscountDisableLocationFindFirstQuery = queryField(
  'findFirstDiscountDisableLocation',
  {
    type: 'DiscountDisableLocation',
    args: {
      where: 'DiscountDisableLocationWhereInput',
      orderBy: list('DiscountDisableLocationOrderByWithRelationInput'),
      cursor: 'DiscountDisableLocationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('DiscountDisableLocationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.discountDisableLocation.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
