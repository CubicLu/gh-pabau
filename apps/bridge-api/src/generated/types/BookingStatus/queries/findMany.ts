import { queryField, nonNull, list } from 'nexus'

export const BookingStatusFindManyQuery = queryField('findManyBookingStatus', {
  type: nonNull(list(nonNull('BookingStatus'))),
  args: {
    where: 'BookingStatusWhereInput',
    orderBy: list('BookingStatusOrderByWithRelationInput'),
    cursor: 'BookingStatusWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('BookingStatusScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bookingStatus.findMany({
      ...args,
      ...select,
    })
  },
})
