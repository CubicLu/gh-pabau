import { queryField, nonNull, list } from 'nexus'

export const ServiceUserPriceFindManyQuery = queryField(
  'findManyServiceUserPrice',
  {
    type: nonNull(list(nonNull('ServiceUserPrice'))),
    args: {
      where: 'ServiceUserPriceWhereInput',
      orderBy: list('ServiceUserPriceOrderByWithRelationInput'),
      cursor: 'ServiceUserPriceWhereUniqueInput',
      distinct: 'ServiceUserPriceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceUserPrice.findMany({
        ...args,
        ...select,
      })
    },
  },
)
