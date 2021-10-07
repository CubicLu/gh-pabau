import { queryField, nonNull, list } from 'nexus'

export const CheckinAveragesIdleFindManyQuery = queryField(
  'findManyCheckinAveragesIdle',
  {
    type: nonNull(list(nonNull('CheckinAveragesIdle'))),
    args: {
      where: 'CheckinAveragesIdleWhereInput',
      orderBy: list('CheckinAveragesIdleOrderByWithRelationInput'),
      cursor: 'CheckinAveragesIdleWhereUniqueInput',
      distinct: 'CheckinAveragesIdleScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.checkinAveragesIdle.findMany({
        ...args,
        ...select,
      })
    },
  },
)
