import { queryField, list } from 'nexus'

export const CancelReasonAggregateQuery = queryField('aggregateCancelReason', {
  type: 'AggregateCancelReason',
  args: {
    where: 'CancelReasonWhereInput',
    orderBy: list('CancelReasonOrderByWithRelationInput'),
    cursor: 'CancelReasonWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cancelReason.aggregate({ ...args, ...select }) as any
  },
})
