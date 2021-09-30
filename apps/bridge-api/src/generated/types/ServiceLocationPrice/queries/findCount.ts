import { queryField, nonNull, list } from 'nexus'

export const ServiceLocationPriceFindCountQuery = queryField(
  'findManyServiceLocationPriceCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ServiceLocationPriceWhereInput',
      orderBy: list('ServiceLocationPriceOrderByWithRelationInput'),
      cursor: 'ServiceLocationPriceWhereUniqueInput',
      distinct: 'ServiceLocationPriceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceLocationPrice.count(args as any)
    },
  },
)
