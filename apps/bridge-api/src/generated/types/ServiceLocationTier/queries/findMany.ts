import { queryField, nonNull, list } from 'nexus'

export const ServiceLocationTierFindManyQuery = queryField(
  'findManyServiceLocationTier',
  {
    type: nonNull(list(nonNull('ServiceLocationTier'))),
    args: {
      where: 'ServiceLocationTierWhereInput',
      orderBy: list('ServiceLocationTierOrderByWithRelationInput'),
      cursor: 'ServiceLocationTierWhereUniqueInput',
      distinct: 'ServiceLocationTierScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceLocationTier.findMany({
        ...args,
        ...select,
      })
    },
  },
)
