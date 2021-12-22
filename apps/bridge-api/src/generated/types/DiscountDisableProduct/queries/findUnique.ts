import { queryField, nonNull } from 'nexus'

export const DiscountDisableProductFindUniqueQuery = queryField(
  'findUniqueDiscountDisableProduct',
  {
    type: 'DiscountDisableProduct',
    args: {
      where: nonNull('DiscountDisableProductWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.discountDisableProduct.findUnique({
        where,
        ...select,
      })
    },
  },
)
