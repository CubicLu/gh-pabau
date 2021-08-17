import { mutationField, nonNull } from 'nexus'

export const CalendarViewUpdateOneMutation = mutationField(
  'updateOneCalendarView',
  {
    type: nonNull('CalendarView'),
    args: {
      where: nonNull('CalendarViewWhereUniqueInput'),
      data: nonNull('CalendarViewUpdateInput'),
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
