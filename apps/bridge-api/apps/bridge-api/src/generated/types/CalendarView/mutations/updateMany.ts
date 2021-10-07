import { mutationField, nonNull } from 'nexus'

export const CalendarViewUpdateManyMutation = mutationField(
  'updateManyCalendarView',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CalendarViewWhereInput',
      data: nonNull('CalendarViewUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.calendarView.updateMany(args as any)
    },
  },
)
