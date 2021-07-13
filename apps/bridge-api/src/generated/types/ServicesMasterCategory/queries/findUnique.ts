import { queryField, nonNull } from 'nexus'

export const ServicesMasterCategoryFindUniqueQuery = queryField(
  'findUniqueServicesMasterCategory',
  {
    type: 'ServicesMasterCategory',
    args: {
      where: nonNull('ServicesMasterCategoryWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.servicesMasterCategory.findUnique({
        where,
        ...select,
      })
    },
  },
)
