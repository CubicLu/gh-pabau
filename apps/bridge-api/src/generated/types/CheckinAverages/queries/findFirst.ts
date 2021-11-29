import { queryField, list } from 'nexus'

export const CheckinAveragesFindFirstQuery = queryField(
  'findFirstCheckinAverages',
  {
    type: 'CheckinAverages',
    args: {
      where: 'CheckinAveragesWhereInput',
      orderBy: list('CheckinAveragesOrderByWithRelationInput'),
      cursor: 'CheckinAveragesWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CheckinAveragesScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.checkinAverages.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
