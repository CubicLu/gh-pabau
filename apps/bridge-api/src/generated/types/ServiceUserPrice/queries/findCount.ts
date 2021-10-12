import { queryField, nonNull, list } from 'nexus'

export const ServiceUserPriceFindCountQuery = queryField(
  'findManyServiceUserPriceCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ServiceUserPriceWhereInput',
      orderBy: list('ServiceUserPriceOrderByWithRelationInput'),
      cursor: 'ServiceUserPriceWhereUniqueInput',
      distinct: 'ServiceUserPriceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceUserPrice.count(args as any)
    },
  },
)
