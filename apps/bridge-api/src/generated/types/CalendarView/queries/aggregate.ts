import { queryField, list } from 'nexus'

export const CalendarViewAggregateQuery = queryField('aggregateCalendarView', {
  type: 'AggregateCalendarView',
  args: {
    where: 'CalendarViewWhereInput',
    orderBy: list('CalendarViewOrderByWithRelationInput'),
    cursor: 'CalendarViewWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.calendarView.aggregate({ ...args, ...select }) as any
  },
})
