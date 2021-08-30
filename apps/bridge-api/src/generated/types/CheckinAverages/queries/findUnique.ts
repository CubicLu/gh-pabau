import { queryField, nonNull } from 'nexus'

export const CheckinAveragesFindUniqueQuery = queryField(
  'findUniqueCheckinAverages',
  {
    type: 'CheckinAverages',
    args: {
      where: nonNull('CheckinAveragesWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.checkinAverages.findUnique({
        where,
        ...select,
      })
    },
  },
)
