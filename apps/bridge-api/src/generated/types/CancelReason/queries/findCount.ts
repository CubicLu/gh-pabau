import { queryField, nonNull, list } from 'nexus'

export const CancelReasonFindCountQuery = queryField(
  'findManyCancelReasonCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CancelReasonWhereInput',
      orderBy: list('CancelReasonOrderByInput'),
      cursor: 'CancelReasonWhereUniqueInput',
      distinct: 'CancelReasonScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cancelReason.count(args as any)
    },
  },
)
