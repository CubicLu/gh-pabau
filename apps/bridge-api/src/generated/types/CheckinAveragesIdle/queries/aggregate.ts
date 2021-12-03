import { queryField, list } from 'nexus'

export const CheckinAveragesIdleAggregateQuery = queryField(
  'aggregateCheckinAveragesIdle',
  {
    type: 'AggregateCheckinAveragesIdle',
    args: {
      where: 'CheckinAveragesIdleWhereInput',
      orderBy: list('CheckinAveragesIdleOrderByWithRelationInput'),
      cursor: 'CheckinAveragesIdleWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.checkinAveragesIdle.aggregate({ ...args, ...select }) as any
    },
  },
)
