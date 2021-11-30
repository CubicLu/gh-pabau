import { queryField, nonNull, list } from 'nexus'

export const ServiceLocationTierFindManyQuery = queryField(
  'findManyServiceLocationTier',
  {
    type: nonNull(list(nonNull('ServiceLocationTier'))),
    args: {
      where: 'ServiceLocationTierWhereInput',
      orderBy: list('ServiceLocationTierOrderByWithRelationInput'),
      cursor: 'ServiceLocationTierWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServiceLocationTierScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceLocationTier.findMany({
        ...args,
        ...select,
      })
    },
  },
)
