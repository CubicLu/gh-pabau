import { queryField, nonNull } from 'nexus'

export const ServiceLocationTierFindUniqueQuery = queryField(
  'findUniqueServiceLocationTier',
  {
    type: 'ServiceLocationTier',
    args: {
      where: nonNull('ServiceLocationTierWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.serviceLocationTier.findUnique({
        where,
        ...select,
      })
    },
  },
)
