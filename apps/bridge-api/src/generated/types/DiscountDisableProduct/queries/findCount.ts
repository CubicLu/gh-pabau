import { queryField, nonNull, list } from 'nexus'

export const DiscountDisableProductFindCountQuery = queryField(
  'findManyDiscountDisableProductCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'DiscountDisableProductWhereInput',
      orderBy: list('DiscountDisableProductOrderByWithRelationInput'),
      cursor: 'DiscountDisableProductWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('DiscountDisableProductScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.discountDisableProduct.count(args as any)
    },
  },
)
