import { mutationField, nonNull } from 'nexus'

export const ServiceLocationTierUpdateManyMutation = mutationField(
  'updateManyServiceLocationTier',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ServiceLocationTierWhereInput',
      data: nonNull('ServiceLocationTierUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceLocationTier.updateMany(args as any)
    },
  },
)
