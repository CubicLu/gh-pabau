import { mutationField, nonNull } from 'nexus'

export const ServiceBundleItemDeleteOneMutation = mutationField(
  'deleteOneServiceBundleItem',
  {
    type: 'ServiceBundleItem',
    args: {
      where: nonNull('ServiceBundleItemWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.serviceBundleItem.delete({
        where,
        ...select,
      })
    },
  },
)
