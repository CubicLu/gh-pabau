import { mutationField, nonNull } from 'nexus'

export const ServiceUserTierUpdateManyMutation = mutationField(
  'updateManyServiceUserTier',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ServiceUserTierUpdateManyMutationInput'),
      where: 'ServiceUserTierWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceUserTier.updateMany(args as any)
    },
  },
)
