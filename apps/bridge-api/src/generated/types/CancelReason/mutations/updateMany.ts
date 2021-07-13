import { mutationField, nonNull } from 'nexus'

export const CancelReasonUpdateManyMutation = mutationField(
  'updateManyCancelReason',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CancelReasonWhereInput',
      data: nonNull('CancelReasonUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cancelReason.updateMany(args as any)
    },
  },
)
