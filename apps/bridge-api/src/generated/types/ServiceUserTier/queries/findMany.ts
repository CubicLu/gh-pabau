import { queryField, nonNull, list } from 'nexus'

export const ServiceUserTierFindManyQuery = queryField(
  'findManyServiceUserTier',
  {
    type: nonNull(list(nonNull('ServiceUserTier'))),
    args: {
      where: 'ServiceUserTierWhereInput',
      orderBy: list('ServiceUserTierOrderByWithRelationInput'),
      cursor: 'ServiceUserTierWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServiceUserTierScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceUserTier.findMany({
        ...args,
        ...select,
      })
    },
  },
)
