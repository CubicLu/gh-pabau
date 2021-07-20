import { mutationField, nonNull } from 'nexus'

export const CancelReasonDeleteOneMutation = mutationField(
  'deleteOneCancelReason',
  {
    type: 'CancelReason',
    args: {
      where: nonNull('CancelReasonWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cancelReason.delete({
        where,
        ...select,
      })
    },
  },
)
