import { queryField, list } from 'nexus'

export const DiscountDisableServiceAggregateQuery = queryField(
  'aggregateDiscountDisableService',
  {
    type: 'AggregateDiscountDisableService',
    args: {
      where: 'DiscountDisableServiceWhereInput',
      orderBy: list('DiscountDisableServiceOrderByWithRelationInput'),
      cursor: 'DiscountDisableServiceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.discountDisableService.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
