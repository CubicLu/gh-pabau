import { queryField, list } from 'nexus'

export const ServiceLocationTierFindFirstQuery = queryField(
  'findFirstServiceLocationTier',
  {
    type: 'ServiceLocationTier',
    args: {
      where: 'ServiceLocationTierWhereInput',
      orderBy: list('ServiceLocationTierOrderByWithRelationInput'),
      cursor: 'ServiceLocationTierWhereUniqueInput',
      distinct: 'ServiceLocationTierScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceLocationTier.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
