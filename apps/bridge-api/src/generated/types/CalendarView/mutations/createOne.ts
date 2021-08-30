import { mutationField, nonNull } from 'nexus'

export const CalendarViewCreateOneMutation = mutationField(
  'createOneCalendarView',
  {
    type: nonNull('CalendarView'),
    args: {
      data: nonNull('CalendarViewCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.calendarView.create({
        data,
        ...select,
      })
    },
  },
)
