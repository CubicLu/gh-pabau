import { queryField, nonNull, list } from 'nexus'

export const ServiceCategoryFindCountQuery = queryField(
  'findManyServiceCategoryCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ServiceCategoryWhereInput',
      orderBy: list('ServiceCategoryOrderByWithRelationInput'),
      cursor: 'ServiceCategoryWhereUniqueInput',
      distinct: 'ServiceCategoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceCategory.count(args as any)
    },
  },
)
