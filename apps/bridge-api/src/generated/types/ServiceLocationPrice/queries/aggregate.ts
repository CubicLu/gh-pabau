import { queryField, list } from 'nexus'

export const ServiceLocationPriceAggregateQuery = queryField(
  'aggregateServiceLocationPrice',
  {
    type: 'AggregateServiceLocationPrice',
    args: {
      where: 'ServiceLocationPriceWhereInput',
      orderBy: list('ServiceLocationPriceOrderByWithRelationInput'),
      cursor: 'ServiceLocationPriceWhereUniqueInput',
      distinct: 'ServiceLocationPriceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceLocationPrice.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
