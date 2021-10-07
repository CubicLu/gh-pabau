import { queryField, nonNull, list } from 'nexus'

export const ServicesMasterCategoryFindManyQuery = queryField(
  'findManyServicesMasterCategory',
  {
    type: nonNull(list(nonNull('ServicesMasterCategory'))),
    args: {
      where: 'ServicesMasterCategoryWhereInput',
      orderBy: list('ServicesMasterCategoryOrderByWithRelationInput'),
      cursor: 'ServicesMasterCategoryWhereUniqueInput',
      distinct: 'ServicesMasterCategoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.servicesMasterCategory.findMany({
        ...args,
        ...select,
      })
    },
  },
)
