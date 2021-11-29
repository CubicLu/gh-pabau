import { queryField, nonNull, list } from 'nexus'

export const CancelReasonFindCountQuery = queryField(
  'findManyCancelReasonCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CancelReasonWhereInput',
      orderBy: list('CancelReasonOrderByWithRelationInput'),
      cursor: 'CancelReasonWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CancelReasonScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cancelReason.count(args as any)
    },
  },
)
