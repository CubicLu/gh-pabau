import { mutationField, nonNull } from 'nexus'

export const BlockReasonUpdateManyMutation = mutationField(
  'updateManyBlockReason',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'BlockReasonWhereInput',
      data: nonNull('BlockReasonUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.blockReason.updateMany(args as any)
    },
  },
)
