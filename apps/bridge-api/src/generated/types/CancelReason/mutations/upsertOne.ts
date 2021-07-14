import { mutationField, nonNull } from 'nexus'

export const CancelReasonUpsertOneMutation = mutationField(
  'upsertOneCancelReason',
  {
    type: nonNull('CancelReason'),
    args: {
      where: nonNull('CancelReasonWhereUniqueInput'),
      create: nonNull('CancelReasonCreateInput'),
      update: nonNull('CancelReasonUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cancelReason.upsert({
        ...args,
        ...select,
      })
    },
  },
)
