import { queryField, list } from 'nexus'

export const ServiceLocationTierFindFirstQuery = queryField(
  'findFirstServiceLocationTier',
  {
    type: 'ServiceLocationTier',
    args: {
      where: 'ServiceLocationTierWhereInput',
      orderBy: list('ServiceLocationTierOrderByWithRelationInput'),
      cursor: 'ServiceLocationTierWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServiceLocationTierScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceLocationTier.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
