import { queryField, nonNull, list } from 'nexus'

export const ServicesMasterCategoryFindCountQuery = queryField(
  'findManyServicesMasterCategoryCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ServicesMasterCategoryWhereInput',
      orderBy: list('ServicesMasterCategoryOrderByInput'),
      cursor: 'ServicesMasterCategoryWhereUniqueInput',
      distinct: 'ServicesMasterCategoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.servicesMasterCategory.count(args as any)
    },
  },
)
