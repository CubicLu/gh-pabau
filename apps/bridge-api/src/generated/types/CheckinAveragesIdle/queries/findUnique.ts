import { queryField, nonNull } from 'nexus'

export const CheckinAveragesIdleFindUniqueQuery = queryField(
  'findUniqueCheckinAveragesIdle',
  {
    type: 'CheckinAveragesIdle',
    args: {
      where: nonNull('CheckinAveragesIdleWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.checkinAveragesIdle.findUnique({
        where,
        ...select,
      })
    },
  },
)
