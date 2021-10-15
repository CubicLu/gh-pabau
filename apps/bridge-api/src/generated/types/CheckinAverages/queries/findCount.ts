import { queryField, nonNull, list } from 'nexus'

export const CheckinAveragesFindCountQuery = queryField(
  'findManyCheckinAveragesCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CheckinAveragesWhereInput',
      orderBy: list('CheckinAveragesOrderByInput'),
      cursor: 'CheckinAveragesWhereUniqueInput',
      distinct: 'CheckinAveragesScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.checkinAverages.count(args as any)
    },
  },
)
