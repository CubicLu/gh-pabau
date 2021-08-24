import { queryField, nonNull, list } from 'nexus'

export const ClockinTimesheetFindManyQuery = queryField(
  'findManyClockinTimesheet',
  {
    type: nonNull(list(nonNull('ClockinTimesheet'))),
    args: {
      where: 'ClockinTimesheetWhereInput',
      orderBy: list('ClockinTimesheetOrderByInput'),
      cursor: 'ClockinTimesheetWhereUniqueInput',
      distinct: 'ClockinTimesheetScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.clockinTimesheet.findMany({
        ...args,
        ...select,
      })
    },
  },
)
