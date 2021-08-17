import { queryField, nonNull } from 'nexus'

export const ServiceCategoryFindUniqueQuery = queryField(
  'findUniqueServiceCategory',
  {
    type: 'ServiceCategory',
    args: {
      where: nonNull('ServiceCategoryWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.serviceCategory.findUnique({
        where,
        ...select,
      })
    },
  },
)
