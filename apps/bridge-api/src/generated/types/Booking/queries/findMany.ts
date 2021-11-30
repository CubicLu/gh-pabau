import { queryField, nonNull, list } from 'nexus'

export const BookingFindManyQuery = queryField('findManyBooking', {
  type: nonNull(list(nonNull('Booking'))),
  args: {
    where: 'BookingWhereInput',
    orderBy: list('BookingOrderByWithRelationInput'),
    cursor: 'BookingWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('BookingScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.booking.findMany({
      ...args,
      ...select,
    })
  },
})
