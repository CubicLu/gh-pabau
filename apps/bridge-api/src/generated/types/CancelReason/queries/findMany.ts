import { queryField, nonNull, list } from 'nexus'

export const CancelReasonFindManyQuery = queryField('findManyCancelReason', {
  type: nonNull(list(nonNull('CancelReason'))),
  args: {
    where: 'CancelReasonWhereInput',
    orderBy: list('CancelReasonOrderByInput'),
    cursor: 'CancelReasonWhereUniqueInput',
    distinct: 'CancelReasonScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cancelReason.findMany({
      ...args,
      ...select,
    })
  },
})
