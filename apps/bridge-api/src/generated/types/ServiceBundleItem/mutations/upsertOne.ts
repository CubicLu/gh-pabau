import { mutationField, nonNull } from 'nexus'

export const ServiceBundleItemUpsertOneMutation = mutationField(
  'upsertOneServiceBundleItem',
  {
    type: nonNull('ServiceBundleItem'),
    args: {
      where: nonNull('ServiceBundleItemWhereUniqueInput'),
      create: nonNull('ServiceBundleItemCreateInput'),
      update: nonNull('ServiceBundleItemUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceBundleItem.upsert({
        ...args,
        ...select,
      })
    },
  },
)
