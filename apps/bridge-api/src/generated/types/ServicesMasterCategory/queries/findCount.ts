import { queryField, nonNull, list } from 'nexus'

export const ServicesMasterCategoryFindCountQuery = queryField(
  'findManyServicesMasterCategoryCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ServicesMasterCategoryWhereInput',
      orderBy: list('ServicesMasterCategoryOrderByWithRelationInput'),
      cursor: 'ServicesMasterCategoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServicesMasterCategoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.servicesMasterCategory.count(args as any)
    },
  },
)
