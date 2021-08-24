import { mutationField, nonNull } from 'nexus'

export const ClockinTimesheetUpdateOneMutation = mutationField(
  'updateOneClockinTimesheet',
  {
    type: nonNull('ClockinTimesheet'),
    args: {
      where: nonNull('ClockinTimesheetWhereUniqueInput'),
      data: nonNull('ClockinTimesheetUpdateInput'),
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
