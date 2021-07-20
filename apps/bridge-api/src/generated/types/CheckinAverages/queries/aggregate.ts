import { queryField, list } from 'nexus'

export const CheckinAveragesAggregateQuery = queryField(
  'aggregateCheckinAverages',
  {
    type: 'AggregateCheckinAverages',
    args: {
      where: 'CheckinAveragesWhereInput',
      orderBy: list('CheckinAveragesOrderByInput'),
      cursor: 'CheckinAveragesWhereUniqueInput',
      distinct: 'CheckinAveragesScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.checkinAverages.aggregate({ ...args, ...select }) as any
    },
  },
)
