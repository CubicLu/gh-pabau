import { queryField, nonNull, list } from 'nexus'

export const CheckinAveragesFindManyQuery = queryField(
  'findManyCheckinAverages',
  {
    type: nonNull(list(nonNull('CheckinAverages'))),
    args: {
      where: 'CheckinAveragesWhereInput',
      orderBy: list('CheckinAveragesOrderByInput'),
      cursor: 'CheckinAveragesWhereUniqueInput',
      distinct: 'CheckinAveragesScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.checkinAverages.findMany({
        ...args,
        ...select,
      })
    },
  },
)
