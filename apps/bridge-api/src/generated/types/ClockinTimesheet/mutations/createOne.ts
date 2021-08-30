import { mutationField, nonNull } from 'nexus'

export const ClockinTimesheetCreateOneMutation = mutationField(
  'createOneClockinTimesheet',
  {
    type: nonNull('ClockinTimesheet'),
    args: {
      data: nonNull('ClockinTimesheetCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.clockinTimesheet.create({
        data,
        ...select,
      })
    },
  },
)
