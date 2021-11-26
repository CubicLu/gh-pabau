import { queryField, list } from 'nexus'

export const ClockinTimesheetAggregateQuery = queryField(
  'aggregateClockinTimesheet',
  {
    type: 'AggregateClockinTimesheet',
    args: {
      where: 'ClockinTimesheetWhereInput',
      orderBy: list('ClockinTimesheetOrderByWithRelationInput'),
      cursor: 'ClockinTimesheetWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.clockinTimesheet.aggregate({ ...args, ...select }) as any
    },
  },
)
