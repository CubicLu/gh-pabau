import { queryField, list } from 'nexus'

export const ServiceBundleItemAggregateQuery = queryField(
  'aggregateServiceBundleItem',
  {
    type: 'AggregateServiceBundleItem',
    args: {
      where: 'ServiceBundleItemWhereInput',
      orderBy: list('ServiceBundleItemOrderByWithRelationInput'),
      cursor: 'ServiceBundleItemWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceBundleItem.aggregate({ ...args, ...select }) as any
    },
  },
)
