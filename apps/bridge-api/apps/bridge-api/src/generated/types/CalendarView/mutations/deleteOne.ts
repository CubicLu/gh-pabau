import { mutationField, nonNull } from 'nexus'

export const CalendarViewDeleteOneMutation = mutationField(
  'deleteOneCalendarView',
  {
    type: 'CalendarView',
    args: {
      where: nonNull('CalendarViewWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.calendarView.delete({
        where,
        ...select,
      })
    },
  },
)
