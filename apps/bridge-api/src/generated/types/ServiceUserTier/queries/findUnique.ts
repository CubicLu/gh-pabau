import { queryField, nonNull } from 'nexus'

export const ServiceUserTierFindUniqueQuery = queryField(
  'findUniqueServiceUserTier',
  {
    type: 'ServiceUserTier',
    args: {
      where: nonNull('ServiceUserTierWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.serviceUserTier.findUnique({
        where,
        ...select,
      })
    },
  },
)
