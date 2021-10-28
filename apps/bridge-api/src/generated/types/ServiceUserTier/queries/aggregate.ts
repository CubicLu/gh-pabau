import { queryField, list } from 'nexus'

export const ServiceUserTierAggregateQuery = queryField(
  'aggregateServiceUserTier',
  {
    type: 'AggregateServiceUserTier',
    args: {
      where: 'ServiceUserTierWhereInput',
      orderBy: list('ServiceUserTierOrderByWithRelationInput'),
      cursor: 'ServiceUserTierWhereUniqueInput',
      distinct: 'ServiceUserTierScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceUserTier.aggregate({ ...args, ...select }) as any
    },
  },
)
