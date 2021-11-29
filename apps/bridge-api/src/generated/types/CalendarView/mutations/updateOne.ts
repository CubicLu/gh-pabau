import { mutationField, nonNull } from 'nexus'

export const CalendarViewUpdateOneMutation = mutationField(
  'updateOneCalendarView',
  {
    type: nonNull('CalendarView'),
    args: {
      data: nonNull('CalendarViewUpdateInput'),
      where: nonNull('CalendarViewWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.calendarView.update({
        where,
        data,
        ...select,
      })
    },
  },
)
