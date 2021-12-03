import { queryField, nonNull, list } from 'nexus'

export const CheckinAveragesIdleFindManyQuery = queryField(
  'findManyCheckinAveragesIdle',
  {
    type: nonNull(list(nonNull('CheckinAveragesIdle'))),
    args: {
      where: 'CheckinAveragesIdleWhereInput',
      orderBy: list('CheckinAveragesIdleOrderByWithRelationInput'),
      cursor: 'CheckinAveragesIdleWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CheckinAveragesIdleScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.checkinAveragesIdle.findMany({
        ...args,
        ...select,
      })
    },
  },
)
