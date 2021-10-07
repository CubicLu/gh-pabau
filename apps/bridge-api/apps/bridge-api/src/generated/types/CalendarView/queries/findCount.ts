import { queryField, nonNull, list } from 'nexus'

export const CalendarViewFindCountQuery = queryField(
  'findManyCalendarViewCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CalendarViewWhereInput',
      orderBy: list('CalendarViewOrderByWithRelationInput'),
      cursor: 'CalendarViewWhereUniqueInput',
      distinct: 'CalendarViewScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.calendarView.count(args as any)
    },
  },
)
