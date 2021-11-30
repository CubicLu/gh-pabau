import { queryField, list } from 'nexus'

export const ClockinTimesheetFindFirstQuery = queryField(
  'findFirstClockinTimesheet',
  {
    type: 'ClockinTimesheet',
    args: {
      where: 'ClockinTimesheetWhereInput',
      orderBy: list('ClockinTimesheetOrderByWithRelationInput'),
      cursor: 'ClockinTimesheetWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClockinTimesheetScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.clockinTimesheet.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
