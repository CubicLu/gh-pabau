import { queryField, list } from 'nexus'

export const ServiceUserTierFindFirstQuery = queryField(
  'findFirstServiceUserTier',
  {
    type: 'ServiceUserTier',
    args: {
      where: 'ServiceUserTierWhereInput',
      orderBy: list('ServiceUserTierOrderByWithRelationInput'),
      cursor: 'ServiceUserTierWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServiceUserTierScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceUserTier.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
