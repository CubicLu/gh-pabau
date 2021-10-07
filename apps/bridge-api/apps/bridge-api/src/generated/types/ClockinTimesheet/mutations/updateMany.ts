import { mutationField, nonNull } from 'nexus'

export const ClockinTimesheetUpdateManyMutation = mutationField(
  'updateManyClockinTimesheet',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ClockinTimesheetWhereInput',
      data: nonNull('ClockinTimesheetUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.clockinTimesheet.updateMany(args as any)
    },
  },
)
