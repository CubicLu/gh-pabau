import { queryField, list } from 'nexus'

export const ServiceCategoryFindFirstQuery = queryField(
  'findFirstServiceCategory',
  {
    type: 'ServiceCategory',
    args: {
      where: 'ServiceCategoryWhereInput',
      orderBy: list('ServiceCategoryOrderByWithRelationInput'),
      cursor: 'ServiceCategoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServiceCategoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceCategory.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
