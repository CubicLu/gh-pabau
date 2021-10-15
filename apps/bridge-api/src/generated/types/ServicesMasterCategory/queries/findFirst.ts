import { queryField, list } from 'nexus'

export const ServicesMasterCategoryFindFirstQuery = queryField(
  'findFirstServicesMasterCategory',
  {
    type: 'ServicesMasterCategory',
    args: {
      where: 'ServicesMasterCategoryWhereInput',
      orderBy: list('ServicesMasterCategoryOrderByInput'),
      cursor: 'ServicesMasterCategoryWhereUniqueInput',
      distinct: 'ServicesMasterCategoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.servicesMasterCategory.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
