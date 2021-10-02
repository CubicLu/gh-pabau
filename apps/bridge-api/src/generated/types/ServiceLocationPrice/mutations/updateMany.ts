import { mutationField, nonNull } from 'nexus'

export const ServiceLocationPriceUpdateManyMutation = mutationField(
  'updateManyServiceLocationPrice',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ServiceLocationPriceWhereInput',
      data: nonNull('ServiceLocationPriceUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceLocationPrice.updateMany(args as any)
    },
  },
)
