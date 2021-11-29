import { mutationField, nonNull } from 'nexus'

export const CancellationPolicyUpdateManyMutation = mutationField(
  'updateManyCancellationPolicy',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CancellationPolicyUpdateManyMutationInput'),
      where: 'CancellationPolicyWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cancellationPolicy.updateMany(args as any)
    },
  },
)
