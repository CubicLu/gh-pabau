import { queryField, nonNull, list } from 'nexus'

export const ClockinTimesheetFindCountQuery = queryField(
  'findManyClockinTimesheetCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClockinTimesheetWhereInput',
      orderBy: list('ClockinTimesheetOrderByInput'),
      cursor: 'ClockinTimesheetWhereUniqueInput',
      distinct: 'ClockinTimesheetScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.clockinTimesheet.count(args as any)
    },
  },
)
