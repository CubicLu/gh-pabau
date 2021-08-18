import { queryField, list } from 'nexus'

export const ServiceCategoryFindFirstQuery = queryField(
  'findFirstServiceCategory',
  {
    type: 'ServiceCategory',
    args: {
      where: 'ServiceCategoryWhereInput',
      orderBy: list('ServiceCategoryOrderByInput'),
      cursor: 'ServiceCategoryWhereUniqueInput',
      distinct: 'ServiceCategoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceCategory.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
