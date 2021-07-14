import { queryField, nonNull, list } from 'nexus'

export const BookingStatusFindManyQuery = queryField('findManyBookingStatus', {
  type: nonNull(list(nonNull('BookingStatus'))),
  args: {
    where: 'BookingStatusWhereInput',
    orderBy: list('BookingStatusOrderByInput'),
    cursor: 'BookingStatusWhereUniqueInput',
    distinct: 'BookingStatusScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bookingStatus.findMany({
      ...args,
      ...select,
    })
  },
})
