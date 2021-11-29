import { queryField, nonNull, list } from 'nexus'

export const CalendarViewFindCountQuery = queryField(
  'findManyCalendarViewCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CalendarViewWhereInput',
      orderBy: list('CalendarViewOrderByWithRelationInput'),
      cursor: 'CalendarViewWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CalendarViewScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.calendarView.count(args as any)
    },
  },
)
