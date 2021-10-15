import { queryField, list } from 'nexus'

export const ServicesMasterCategoryAggregateQuery = queryField(
  'aggregateServicesMasterCategory',
  {
    type: 'AggregateServicesMasterCategory',
    args: {
      where: 'ServicesMasterCategoryWhereInput',
      orderBy: list('ServicesMasterCategoryOrderByInput'),
      cursor: 'ServicesMasterCategoryWhereUniqueInput',
      distinct: 'ServicesMasterCategoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.servicesMasterCategory.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
