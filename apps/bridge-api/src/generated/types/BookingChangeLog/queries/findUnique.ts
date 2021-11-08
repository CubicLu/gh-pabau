import { queryField, nonNull } from 'nexus'

export const BookingChangeLogFindUniqueQuery = queryField(
  'findUniqueBookingChangeLog',
  {
    type: 'BookingChangeLog',
    args: {
      where: nonNull('BookingChangeLogWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.bookingChangeLog.findUnique({
        where,
        ...select,
      })
    },
  },
)
