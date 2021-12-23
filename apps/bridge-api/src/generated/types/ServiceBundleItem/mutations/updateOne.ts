import { mutationField, nonNull } from 'nexus'

export const ServiceBundleItemUpdateOneMutation = mutationField(
  'updateOneServiceBundleItem',
  {
    type: nonNull('ServiceBundleItem'),
    args: {
      data: nonNull('ServiceBundleItemUpdateInput'),
      where: nonNull('ServiceBundleItemWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.serviceBundleItem.update({
        where,
        data,
        ...select,
      })
    },
  },
)
