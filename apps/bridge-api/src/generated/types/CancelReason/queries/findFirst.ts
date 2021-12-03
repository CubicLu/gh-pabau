import { queryField, list } from 'nexus'

export const CancelReasonFindFirstQuery = queryField('findFirstCancelReason', {
  type: 'CancelReason',
  args: {
    where: 'CancelReasonWhereInput',
    orderBy: list('CancelReasonOrderByWithRelationInput'),
    cursor: 'CancelReasonWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CancelReasonScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cancelReason.findFirst({
      ...args,
      ...select,
    })
  },
})
