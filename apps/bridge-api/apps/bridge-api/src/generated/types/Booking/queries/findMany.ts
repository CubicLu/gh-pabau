import { queryField, nonNull, list } from 'nexus'

export const BookingFindManyQuery = queryField('findManyBooking', {
  type: nonNull(list(nonNull('Booking'))),
  args: {
    where: 'BookingWhereInput',
    orderBy: list('BookingOrderByWithRelationInput'),
    cursor: 'BookingWhereUniqueInput',
    distinct: 'BookingScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.booking.findMany({
      ...args,
      ...select,
    })
  },
})
