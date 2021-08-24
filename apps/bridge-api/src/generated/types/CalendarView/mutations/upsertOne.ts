import { mutationField, nonNull } from 'nexus'

export const CalendarViewUpsertOneMutation = mutationField(
  'upsertOneCalendarView',
  {
    type: nonNull('CalendarView'),
    args: {
      where: nonNull('CalendarViewWhereUniqueInput'),
      create: nonNull('CalendarViewCreateInput'),
      update: nonNull('CalendarViewUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.calendarView.upsert({
        ...args,
        ...select,
      })
    },
  },
)
