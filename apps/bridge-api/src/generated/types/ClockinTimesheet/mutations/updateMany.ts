import { mutationField, nonNull } from 'nexus'

export const ClockinTimesheetUpdateManyMutation = mutationField(
  'updateManyClockinTimesheet',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ClockinTimesheetUpdateManyMutationInput'),
      where: 'ClockinTimesheetWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.clockinTimesheet.updateMany(args as any)
    },
  },
)
