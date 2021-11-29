import { mutationField, nonNull } from 'nexus'

export const BlockReasonUpdateManyMutation = mutationField(
  'updateManyBlockReason',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('BlockReasonUpdateManyMutationInput'),
      where: 'BlockReasonWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.blockReason.updateMany(args as any)
    },
  },
)
