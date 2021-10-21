import { queryField, nonNull, list } from 'nexus'

export const ServiceUserTierFindCountQuery = queryField(
  'findManyServiceUserTierCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ServiceUserTierWhereInput',
      orderBy: list('ServiceUserTierOrderByWithRelationInput'),
      cursor: 'ServiceUserTierWhereUniqueInput',
      distinct: 'ServiceUserTierScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceUserTier.count(args as any)
    },
  },
)
