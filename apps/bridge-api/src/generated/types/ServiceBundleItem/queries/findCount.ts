import { queryField, nonNull, list } from 'nexus'

export const ServiceBundleItemFindCountQuery = queryField(
  'findManyServiceBundleItemCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ServiceBundleItemWhereInput',
      orderBy: list('ServiceBundleItemOrderByWithRelationInput'),
      cursor: 'ServiceBundleItemWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServiceBundleItemScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceBundleItem.count(args as any)
    },
  },
)
