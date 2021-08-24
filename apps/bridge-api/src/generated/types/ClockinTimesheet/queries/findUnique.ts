import { queryField, nonNull } from 'nexus'

export const ClockinTimesheetFindUniqueQuery = queryField(
  'findUniqueClockinTimesheet',
  {
    type: 'ClockinTimesheet',
    args: {
      where: nonNull('ClockinTimesheetWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.clockinTimesheet.findUnique({
        where,
        ...select,
      })
    },
  },
)
