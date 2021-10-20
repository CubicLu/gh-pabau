import { queryField, list } from 'nexus'

export const ServiceLocationTierAggregateQuery = queryField(
  'aggregateServiceLocationTier',
  {
    type: 'AggregateServiceLocationTier',
    args: {
      where: 'ServiceLocationTierWhereInput',
      orderBy: list('ServiceLocationTierOrderByWithRelationInput'),
      cursor: 'ServiceLocationTierWhereUniqueInput',
      distinct: 'ServiceLocationTierScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceLocationTier.aggregate({ ...args, ...select }) as any
    },
  },
)
