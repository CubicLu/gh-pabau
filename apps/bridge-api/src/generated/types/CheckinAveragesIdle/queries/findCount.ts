import { queryField, nonNull, list } from 'nexus'

export const CheckinAveragesIdleFindCountQuery = queryField(
  'findManyCheckinAveragesIdleCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CheckinAveragesIdleWhereInput',
      orderBy: list('CheckinAveragesIdleOrderByWithRelationInput'),
      cursor: 'CheckinAveragesIdleWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CheckinAveragesIdleScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.checkinAveragesIdle.count(args as any)
    },
  },
)
