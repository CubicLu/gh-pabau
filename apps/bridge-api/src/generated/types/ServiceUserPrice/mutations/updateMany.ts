import { mutationField, nonNull } from 'nexus'

export const ServiceUserPriceUpdateManyMutation = mutationField(
  'updateManyServiceUserPrice',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ServiceUserPriceWhereInput',
      data: nonNull('ServiceUserPriceUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceUserPrice.updateMany(args as any)
    },
  },
)
