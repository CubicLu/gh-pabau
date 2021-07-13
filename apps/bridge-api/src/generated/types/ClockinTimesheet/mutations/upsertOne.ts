import { mutationField, nonNull } from 'nexus'

export const ClockinTimesheetUpsertOneMutation = mutationField(
  'upsertOneClockinTimesheet',
  {
    type: nonNull('ClockinTimesheet'),
    args: {
      where: nonNull('ClockinTimesheetWhereUniqueInput'),
      create: nonNull('ClockinTimesheetCreateInput'),
      update: nonNull('ClockinTimesheetUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.clockinTimesheet.upsert({
        ...args,
        ...select,
      })
    },
  },
)
