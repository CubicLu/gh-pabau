import { queryField, nonNull, list } from 'nexus'

export const CheckinAveragesFindManyQuery = queryField(
  'findManyCheckinAverages',
  {
    type: nonNull(list(nonNull('CheckinAverages'))),
    args: {
      where: 'CheckinAveragesWhereInput',
      orderBy: list('CheckinAveragesOrderByWithRelationInput'),
      cursor: 'CheckinAveragesWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CheckinAveragesScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.checkinAverages.findMany({
        ...args,
        ...select,
      })
    },
  },
)
