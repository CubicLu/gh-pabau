import { mutationField, nonNull } from 'nexus'

export const CalendarViewUpdateManyMutation = mutationField(
  'updateManyCalendarView',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CalendarViewUpdateManyMutationInput'),
      where: 'CalendarViewWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.calendarView.updateMany(args as any)
    },
  },
)
