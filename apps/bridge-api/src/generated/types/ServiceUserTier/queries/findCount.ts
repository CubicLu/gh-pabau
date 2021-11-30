import { queryField, nonNull, list } from 'nexus'

export const ServiceUserTierFindCountQuery = queryField(
  'findManyServiceUserTierCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ServiceUserTierWhereInput',
      orderBy: list('ServiceUserTierOrderByWithRelationInput'),
      cursor: 'ServiceUserTierWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServiceUserTierScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceUserTier.count(args as any)
    },
  },
)
