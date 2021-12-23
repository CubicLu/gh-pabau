import { queryField, nonNull } from 'nexus'

export const ServiceBundleItemFindUniqueQuery = queryField(
  'findUniqueServiceBundleItem',
  {
    type: 'ServiceBundleItem',
    args: {
      where: nonNull('ServiceBundleItemWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.serviceBundleItem.findUnique({
        where,
        ...select,
      })
    },
  },
)
