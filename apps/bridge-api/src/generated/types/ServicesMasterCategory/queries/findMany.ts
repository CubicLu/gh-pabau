import { queryField, nonNull, list } from 'nexus'

export const ServicesMasterCategoryFindManyQuery = queryField(
  'findManyServicesMasterCategory',
  {
    type: nonNull(list(nonNull('ServicesMasterCategory'))),
    args: {
      where: 'ServicesMasterCategoryWhereInput',
      orderBy: list('ServicesMasterCategoryOrderByWithRelationInput'),
      cursor: 'ServicesMasterCategoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServicesMasterCategoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.servicesMasterCategory.findMany({
        ...args,
        ...select,
      })
    },
  },
)
