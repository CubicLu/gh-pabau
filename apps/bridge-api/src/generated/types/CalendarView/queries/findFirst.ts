import { queryField, list } from 'nexus'

export const CalendarViewFindFirstQuery = queryField('findFirstCalendarView', {
  type: 'CalendarView',
  args: {
    where: 'CalendarViewWhereInput',
    orderBy: list('CalendarViewOrderByWithRelationInput'),
    cursor: 'CalendarViewWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CalendarViewScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.calendarView.findFirst({
      ...args,
      ...select,
    })
  },
})
