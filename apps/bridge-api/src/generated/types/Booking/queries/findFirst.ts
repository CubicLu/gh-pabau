import { queryField, list } from 'nexus'

export const BookingFindFirstQuery = queryField('findFirstBooking', {
  type: 'Booking',
  args: {
    where: 'BookingWhereInput',
    orderBy: list('BookingOrderByWithRelationInput'),
    cursor: 'BookingWhereUniqueInput',
    distinct: 'BookingScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.booking.findFirst({
      ...args,
      ...select,
    })
  },
})
