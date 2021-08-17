import { mutationField, nonNull } from 'nexus'

export const CancellationPolicyUpdateManyMutation = mutationField(
  'updateManyCancellationPolicy',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CancellationPolicyWhereInput',
      data: nonNull('CancellationPolicyUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cancellationPolicy.updateMany(args as any)
    },
  },
)
