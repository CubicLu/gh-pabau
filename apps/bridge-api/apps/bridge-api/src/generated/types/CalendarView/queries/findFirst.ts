import { queryField, list } from 'nexus'

export const CalendarViewFindFirstQuery = queryField('findFirstCalendarView', {
  type: 'CalendarView',
  args: {
    where: 'CalendarViewWhereInput',
    orderBy: list('CalendarViewOrderByWithRelationInput'),
    cursor: 'CalendarViewWhereUniqueInput',
    distinct: 'CalendarViewScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.calendarView.findFirst({
      ...args,
      ...select,
    })
  },
})
