import { queryField, list } from 'nexus'

export const CheckinAveragesIdleFindFirstQuery = queryField(
  'findFirstCheckinAveragesIdle',
  {
    type: 'CheckinAveragesIdle',
    args: {
      where: 'CheckinAveragesIdleWhereInput',
      orderBy: list('CheckinAveragesIdleOrderByWithRelationInput'),
      cursor: 'CheckinAveragesIdleWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CheckinAveragesIdleScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.checkinAveragesIdle.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
