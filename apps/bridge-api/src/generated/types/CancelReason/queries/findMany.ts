import { queryField, nonNull, list } from 'nexus'

export const CancelReasonFindManyQuery = queryField('findManyCancelReason', {
  type: nonNull(list(nonNull('CancelReason'))),
  args: {
    where: 'CancelReasonWhereInput',
    orderBy: list('CancelReasonOrderByWithRelationInput'),
    cursor: 'CancelReasonWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CancelReasonScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cancelReason.findMany({
      ...args,
      ...select,
    })
  },
})
