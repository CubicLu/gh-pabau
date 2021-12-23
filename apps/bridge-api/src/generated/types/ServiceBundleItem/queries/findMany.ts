import { queryField, nonNull, list } from 'nexus'

export const ServiceBundleItemFindManyQuery = queryField(
  'findManyServiceBundleItem',
  {
    type: nonNull(list(nonNull('ServiceBundleItem'))),
    args: {
      where: 'ServiceBundleItemWhereInput',
      orderBy: list('ServiceBundleItemOrderByWithRelationInput'),
      cursor: 'ServiceBundleItemWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServiceBundleItemScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceBundleItem.findMany({
        ...args,
        ...select,
      })
    },
  },
)
