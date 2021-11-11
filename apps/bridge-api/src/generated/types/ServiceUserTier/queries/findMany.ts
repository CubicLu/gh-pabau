import { queryField, nonNull, list } from 'nexus'

export const ServiceUserTierFindManyQuery = queryField(
  'findManyServiceUserTier',
  {
    type: nonNull(list(nonNull('ServiceUserTier'))),
    args: {
      where: 'ServiceUserTierWhereInput',
      orderBy: list('ServiceUserTierOrderByWithRelationInput'),
      cursor: 'ServiceUserTierWhereUniqueInput',
      distinct: 'ServiceUserTierScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceUserTier.findMany({
        ...args,
        ...select,
      })
    },
  },
)
