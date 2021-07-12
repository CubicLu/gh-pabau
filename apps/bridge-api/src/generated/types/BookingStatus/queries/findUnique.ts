import { queryField, nonNull } from 'nexus'

export const BookingStatusFindUniqueQuery = queryField(
  'findUniqueBookingStatus',
  {
    type: 'BookingStatus',
    args: {
      where: nonNull('BookingStatusWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.bookingStatus.findUnique({
        where,
        ...select,
      })
    },
  },
)
