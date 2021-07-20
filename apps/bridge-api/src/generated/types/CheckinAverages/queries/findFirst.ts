import { queryField, list } from 'nexus'

export const CheckinAveragesFindFirstQuery = queryField(
  'findFirstCheckinAverages',
  {
    type: 'CheckinAverages',
    args: {
      where: 'CheckinAveragesWhereInput',
      orderBy: list('CheckinAveragesOrderByInput'),
      cursor: 'CheckinAveragesWhereUniqueInput',
      distinct: 'CheckinAveragesScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.checkinAverages.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
