import { queryField, list } from 'nexus'

export const DiscountDisableProductFindFirstQuery = queryField(
  'findFirstDiscountDisableProduct',
  {
    type: 'DiscountDisableProduct',
    args: {
      where: 'DiscountDisableProductWhereInput',
      orderBy: list('DiscountDisableProductOrderByWithRelationInput'),
      cursor: 'DiscountDisableProductWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('DiscountDisableProductScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.discountDisableProduct.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
