import { mutationField, nonNull } from 'nexus'

export const ServiceLocationTierUpdateManyMutation = mutationField(
  'updateManyServiceLocationTier',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ServiceLocationTierUpdateManyMutationInput'),
      where: 'ServiceLocationTierWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceLocationTier.updateMany(args as any)
    },
  },
)
