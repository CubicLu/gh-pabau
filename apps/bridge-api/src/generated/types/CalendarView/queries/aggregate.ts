import { queryField, list } from 'nexus'

export const CalendarViewAggregateQuery = queryField('aggregateCalendarView', {
  type: 'AggregateCalendarView',
  args: {
    where: 'CalendarViewWhereInput',
    orderBy: list('CalendarViewOrderByInput'),
    cursor: 'CalendarViewWhereUniqueInput',
    distinct: 'CalendarViewScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.calendarView.aggregate({ ...args, ...select }) as any
  },
})
