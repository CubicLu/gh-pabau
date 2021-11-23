import { queryField, nonNull } from 'nexus'

export const BookingCancelFindUniqueQuery = queryField(
  'findUniqueBookingCancel',
  {
    type: 'BookingCancel',
    args: {
      where: nonNull('BookingCancelWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.bookingCancel.findUnique({
        where,
        ...select,
      })
    },
  },
)
