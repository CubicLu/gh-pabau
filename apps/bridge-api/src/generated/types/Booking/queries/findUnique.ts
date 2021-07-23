import { queryField, nonNull } from 'nexus'

export const BookingFindUniqueQuery = queryField('findUniqueBooking', {
  type: 'Booking',
  args: {
    where: nonNull('BookingWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.booking.findUnique({
      where,
      ...select,
    })
  },
})
