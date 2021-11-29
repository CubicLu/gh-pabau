import { mutationField, nonNull } from 'nexus'

export const ClockinTimesheetUpdateOneMutation = mutationField(
  'updateOneClockinTimesheet',
  {
    type: nonNull('ClockinTimesheet'),
    args: {
      data: nonNull('ClockinTimesheetUpdateInput'),
      where: nonNull('ClockinTimesheetWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.clockinTimesheet.update({
        where,
        data,
        ...select,
      })
    },
  },
)
