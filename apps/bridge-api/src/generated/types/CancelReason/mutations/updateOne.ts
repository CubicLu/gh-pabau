import { mutationField, nonNull } from 'nexus'

export const CancelReasonUpdateOneMutation = mutationField(
  'updateOneCancelReason',
  {
    type: nonNull('CancelReason'),
    args: {
      where: nonNull('CancelReasonWhereUniqueInput'),
      data: nonNull('CancelReasonUpdateInput'),
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
