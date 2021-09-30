import { queryField, list } from 'nexus'

export const ServiceLocationPriceFindFirstQuery = queryField(
  'findFirstServiceLocationPrice',
  {
    type: 'ServiceLocationPrice',
    args: {
      where: 'ServiceLocationPriceWhereInput',
      orderBy: list('ServiceLocationPriceOrderByWithRelationInput'),
      cursor: 'ServiceLocationPriceWhereUniqueInput',
      distinct: 'ServiceLocationPriceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceLocationPrice.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
