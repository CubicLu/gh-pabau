import { queryField, nonNull, list } from 'nexus'

export const ClockinTimesheetFindCountQuery = queryField(
  'findManyClockinTimesheetCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClockinTimesheetWhereInput',
      orderBy: list('ClockinTimesheetOrderByWithRelationInput'),
      cursor: 'ClockinTimesheetWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClockinTimesheetScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.clockinTimesheet.count(args as any)
    },
  },
)
