import { queryField, list } from 'nexus'

export const CancelReasonFindFirstQuery = queryField('findFirstCancelReason', {
  type: 'CancelReason',
  args: {
    where: 'CancelReasonWhereInput',
    orderBy: list('CancelReasonOrderByWithRelationInput'),
    cursor: 'CancelReasonWhereUniqueInput',
    distinct: 'CancelReasonScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cancelReason.findFirst({
      ...args,
      ...select,
    })
  },
})
