import { queryField, list } from 'nexus'

export const DiscountDisableProductAggregateQuery = queryField(
  'aggregateDiscountDisableProduct',
  {
    type: 'AggregateDiscountDisableProduct',
    args: {
      where: 'DiscountDisableProductWhereInput',
      orderBy: list('DiscountDisableProductOrderByWithRelationInput'),
      cursor: 'DiscountDisableProductWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.discountDisableProduct.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
