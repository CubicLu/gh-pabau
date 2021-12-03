import { mutationField, nonNull } from 'nexus'

export const CancelReasonUpdateManyMutation = mutationField(
  'updateManyCancelReason',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CancelReasonUpdateManyMutationInput'),
      where: 'CancelReasonWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cancelReason.updateMany(args as any)
    },
  },
)
