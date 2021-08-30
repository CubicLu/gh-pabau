import { queryField, list } from 'nexus'

export const ClockinTimesheetFindFirstQuery = queryField(
  'findFirstClockinTimesheet',
  {
    type: 'ClockinTimesheet',
    args: {
      where: 'ClockinTimesheetWhereInput',
      orderBy: list('ClockinTimesheetOrderByInput'),
      cursor: 'ClockinTimesheetWhereUniqueInput',
      distinct: 'ClockinTimesheetScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.clockinTimesheet.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
