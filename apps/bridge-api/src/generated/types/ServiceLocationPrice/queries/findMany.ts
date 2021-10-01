import { queryField, nonNull, list } from 'nexus'

export const ServiceLocationPriceFindManyQuery = queryField(
  'findManyServiceLocationPrice',
  {
    type: nonNull(list(nonNull('ServiceLocationPrice'))),
    args: {
      where: 'ServiceLocationPriceWhereInput',
      orderBy: list('ServiceLocationPriceOrderByWithRelationInput'),
      cursor: 'ServiceLocationPriceWhereUniqueInput',
      distinct: 'ServiceLocationPriceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceLocationPrice.findMany({
        ...args,
        ...select,
      })
    },
  },
)
