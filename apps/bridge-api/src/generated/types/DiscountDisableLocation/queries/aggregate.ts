import { queryField, list } from 'nexus'

export const DiscountDisableLocationAggregateQuery = queryField(
  'aggregateDiscountDisableLocation',
  {
    type: 'AggregateDiscountDisableLocation',
    args: {
      where: 'DiscountDisableLocationWhereInput',
      orderBy: list('DiscountDisableLocationOrderByWithRelationInput'),
      cursor: 'DiscountDisableLocationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.discountDisableLocation.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
