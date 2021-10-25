import { queryField, list } from 'nexus'

export const ServiceUserTierFindFirstQuery = queryField(
  'findFirstServiceUserTier',
  {
    type: 'ServiceUserTier',
    args: {
      where: 'ServiceUserTierWhereInput',
      orderBy: list('ServiceUserTierOrderByWithRelationInput'),
      cursor: 'ServiceUserTierWhereUniqueInput',
      distinct: 'ServiceUserTierScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceUserTier.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
