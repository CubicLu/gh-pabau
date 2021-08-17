import { queryField, nonNull } from 'nexus'

export const CalendarViewFindUniqueQuery = queryField(
  'findUniqueCalendarView',
  {
    type: 'CalendarView',
    args: {
      where: nonNull('CalendarViewWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.calendarView.findUnique({
        where,
        ...select,
      })
    },
  },
)
