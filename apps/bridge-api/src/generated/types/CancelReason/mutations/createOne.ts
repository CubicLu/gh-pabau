import { mutationField, nonNull } from 'nexus'

export const CancelReasonCreateOneMutation = mutationField(
  'createOneCancelReason',
  {
    type: nonNull('CancelReason'),
    args: {
      data: nonNull('CancelReasonCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cancelReason.create({
        data,
        ...select,
      })
    },
  },
)
