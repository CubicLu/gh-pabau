import { queryField, nonNull, list } from 'nexus'

export const CalendarViewFindManyQuery = queryField('findManyCalendarView', {
  type: nonNull(list(nonNull('CalendarView'))),
  args: {
    where: 'CalendarViewWhereInput',
    orderBy: list('CalendarViewOrderByInput'),
    cursor: 'CalendarViewWhereUniqueInput',
    distinct: 'CalendarViewScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.calendarView.findMany({
      ...args,
      ...select,
    })
  },
})
