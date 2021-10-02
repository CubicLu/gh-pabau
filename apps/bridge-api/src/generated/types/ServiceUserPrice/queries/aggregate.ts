import { queryField, list } from 'nexus'

export const ServiceUserPriceAggregateQuery = queryField(
  'aggregateServiceUserPrice',
  {
    type: 'AggregateServiceUserPrice',
    args: {
      where: 'ServiceUserPriceWhereInput',
      orderBy: list('ServiceUserPriceOrderByWithRelationInput'),
      cursor: 'ServiceUserPriceWhereUniqueInput',
      distinct: 'ServiceUserPriceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceUserPrice.aggregate({ ...args, ...select }) as any
    },
  },
)
