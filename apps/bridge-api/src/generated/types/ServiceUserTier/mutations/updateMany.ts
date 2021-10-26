import { mutationField, nonNull } from 'nexus'

export const ServiceUserTierUpdateManyMutation = mutationField(
  'updateManyServiceUserTier',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ServiceUserTierWhereInput',
      data: nonNull('ServiceUserTierUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceUserTier.updateMany(args as any)
    },
  },
)
