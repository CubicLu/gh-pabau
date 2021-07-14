import { queryField, nonNull } from 'nexus'

export const BookingStatusChangeFindUniqueQuery = queryField(
  'findUniqueBookingStatusChange',
  {
    type: 'BookingStatusChange',
    args: {
      where: nonNull('BookingStatusChangeWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.bookingStatusChange.findUnique({
        where,
        ...select,
      })
    },
  },
)
