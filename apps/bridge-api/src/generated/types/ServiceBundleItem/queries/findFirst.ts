import { queryField, list } from 'nexus'

export const ServiceBundleItemFindFirstQuery = queryField(
  'findFirstServiceBundleItem',
  {
    type: 'ServiceBundleItem',
    args: {
      where: 'ServiceBundleItemWhereInput',
      orderBy: list('ServiceBundleItemOrderByWithRelationInput'),
      cursor: 'ServiceBundleItemWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServiceBundleItemScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceBundleItem.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
