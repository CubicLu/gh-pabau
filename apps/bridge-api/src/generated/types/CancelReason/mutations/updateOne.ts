import { mutationField, nonNull } from 'nexus'

export const CancelReasonUpdateOneMutation = mutationField(
  'updateOneCancelReason',
  {
    type: nonNull('CancelReason'),
    args: {
      data: nonNull('CancelReasonUpdateInput'),
      where: nonNull('CancelReasonWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cancelReason.update({
        where,
        data,
        ...select,
      })
    },
  },
)
