import { queryField, nonNull } from 'nexus'

export const CancelReasonFindUniqueQuery = queryField(
  'findUniqueCancelReason',
  {
    type: 'CancelReason',
    args: {
      where: nonNull('CancelReasonWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cancelReason.findUnique({
        where,
        ...select,
      })
    },
  },
)
