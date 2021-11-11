import { queryField, nonNull, list } from 'nexus'

export const ServiceLocationTierFindCountQuery = queryField(
  'findManyServiceLocationTierCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ServiceLocationTierWhereInput',
      orderBy: list('ServiceLocationTierOrderByWithRelationInput'),
      cursor: 'ServiceLocationTierWhereUniqueInput',
      distinct: 'ServiceLocationTierScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceLocationTier.count(args as any)
    },
  },
)
