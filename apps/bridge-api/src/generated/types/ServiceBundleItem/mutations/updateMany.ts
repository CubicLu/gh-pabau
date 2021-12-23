import { mutationField, nonNull } from 'nexus'

export const ServiceBundleItemUpdateManyMutation = mutationField(
  'updateManyServiceBundleItem',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ServiceBundleItemUpdateManyMutationInput'),
      where: 'ServiceBundleItemWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceBundleItem.updateMany(args as any)
    },
  },
)
