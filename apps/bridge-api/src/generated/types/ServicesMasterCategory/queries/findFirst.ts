import { queryField, list } from 'nexus'

export const ServicesMasterCategoryFindFirstQuery = queryField(
  'findFirstServicesMasterCategory',
  {
    type: 'ServicesMasterCategory',
    args: {
      where: 'ServicesMasterCategoryWhereInput',
      orderBy: list('ServicesMasterCategoryOrderByWithRelationInput'),
      cursor: 'ServicesMasterCategoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServicesMasterCategoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.servicesMasterCategory.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
