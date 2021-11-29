import { queryField, nonNull, list } from 'nexus'

export const ServiceLocationTierFindCountQuery = queryField(
  'findManyServiceLocationTierCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ServiceLocationTierWhereInput',
      orderBy: list('ServiceLocationTierOrderByWithRelationInput'),
      cursor: 'ServiceLocationTierWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServiceLocationTierScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceLocationTier.count(args as any)
    },
  },
)
