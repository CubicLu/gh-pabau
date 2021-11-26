import { queryField, nonNull, list } from 'nexus'

export const ClockinTimesheetFindManyQuery = queryField(
  'findManyClockinTimesheet',
  {
    type: nonNull(list(nonNull('ClockinTimesheet'))),
    args: {
      where: 'ClockinTimesheetWhereInput',
      orderBy: list('ClockinTimesheetOrderByWithRelationInput'),
      cursor: 'ClockinTimesheetWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClockinTimesheetScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.clockinTimesheet.findMany({
        ...args,
        ...select,
      })
    },
  },
)
