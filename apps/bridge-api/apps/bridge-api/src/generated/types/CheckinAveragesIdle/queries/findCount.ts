import { queryField, nonNull, list } from 'nexus'

export const CheckinAveragesIdleFindCountQuery = queryField(
  'findManyCheckinAveragesIdleCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CheckinAveragesIdleWhereInput',
      orderBy: list('CheckinAveragesIdleOrderByWithRelationInput'),
      cursor: 'CheckinAveragesIdleWhereUniqueInput',
      distinct: 'CheckinAveragesIdleScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.checkinAveragesIdle.count(args as any)
    },
  },
)
