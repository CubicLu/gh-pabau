import { queryField, list } from 'nexus'

export const ServicesMasterCategoryAggregateQuery = queryField(
  'aggregateServicesMasterCategory',
  {
    type: 'AggregateServicesMasterCategory',
    args: {
      where: 'ServicesMasterCategoryWhereInput',
      orderBy: list('ServicesMasterCategoryOrderByWithRelationInput'),
      cursor: 'ServicesMasterCategoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.servicesMasterCategory.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
