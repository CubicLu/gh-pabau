import { queryField, nonNull, list } from 'nexus'

export const ServiceCategoryFindManyQuery = queryField(
  'findManyServiceCategory',
  {
    type: nonNull(list(nonNull('ServiceCategory'))),
    args: {
      where: 'ServiceCategoryWhereInput',
      orderBy: list('ServiceCategoryOrderByWithRelationInput'),
      cursor: 'ServiceCategoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServiceCategoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceCategory.findMany({
        ...args,
        ...select,
      })
    },
  },
)
