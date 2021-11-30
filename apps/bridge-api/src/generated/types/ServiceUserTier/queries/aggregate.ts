import { queryField, list } from 'nexus'

export const ServiceUserTierAggregateQuery = queryField(
  'aggregateServiceUserTier',
  {
    type: 'AggregateServiceUserTier',
    args: {
      where: 'ServiceUserTierWhereInput',
      orderBy: list('ServiceUserTierOrderByWithRelationInput'),
      cursor: 'ServiceUserTierWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceUserTier.aggregate({ ...args, ...select }) as any
    },
  },
)
