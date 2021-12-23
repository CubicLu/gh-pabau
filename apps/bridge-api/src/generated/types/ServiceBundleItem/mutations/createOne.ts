import { mutationField, nonNull } from 'nexus'

export const ServiceBundleItemCreateOneMutation = mutationField(
  'createOneServiceBundleItem',
  {
    type: nonNull('ServiceBundleItem'),
    args: {
      data: nonNull('ServiceBundleItemCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.serviceBundleItem.create({
        data,
        ...select,
      })
    },
  },
)
