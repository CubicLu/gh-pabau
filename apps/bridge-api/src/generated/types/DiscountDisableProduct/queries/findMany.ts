import { queryField, nonNull, list } from 'nexus'

export const DiscountDisableProductFindManyQuery = queryField(
  'findManyDiscountDisableProduct',
  {
    type: nonNull(list(nonNull('DiscountDisableProduct'))),
    args: {
      where: 'DiscountDisableProductWhereInput',
      orderBy: list('DiscountDisableProductOrderByWithRelationInput'),
      cursor: 'DiscountDisableProductWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('DiscountDisableProductScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.discountDisableProduct.findMany({
        ...args,
        ...select,
      })
    },
  },
)
