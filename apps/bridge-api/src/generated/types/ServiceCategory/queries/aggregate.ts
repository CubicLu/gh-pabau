import { queryField, list } from 'nexus'

export const ServiceCategoryAggregateQuery = queryField(
  'aggregateServiceCategory',
  {
    type: 'AggregateServiceCategory',
    args: {
      where: 'ServiceCategoryWhereInput',
      orderBy: list('ServiceCategoryOrderByWithRelationInput'),
      cursor: 'ServiceCategoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceCategory.aggregate({ ...args, ...select }) as any
    },
  },
)
