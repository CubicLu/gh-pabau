import { queryField, nonNull, list } from 'nexus'

export const CalendarViewFindManyQuery = queryField('findManyCalendarView', {
  type: nonNull(list(nonNull('CalendarView'))),
  args: {
    where: 'CalendarViewWhereInput',
    orderBy: list('CalendarViewOrderByWithRelationInput'),
    cursor: 'CalendarViewWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CalendarViewScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.calendarView.findMany({
      ...args,
      ...select,
    })
  },
})
