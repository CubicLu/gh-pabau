import { queryField, nonNull, list } from 'nexus'

export const CheckinAveragesFindCountQuery = queryField(
  'findManyCheckinAveragesCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CheckinAveragesWhereInput',
      orderBy: list('CheckinAveragesOrderByWithRelationInput'),
      cursor: 'CheckinAveragesWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CheckinAveragesScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.checkinAverages.count(args as any)
    },
  },
)
