import { queryField, nonNull, list } from 'nexus'

export const BookingStatusFindCountQuery = queryField(
  'findManyBookingStatusCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'BookingStatusWhereInput',
      orderBy: list('BookingStatusOrderByInput'),
      cursor: 'BookingStatusWhereUniqueInput',
      distinct: 'BookingStatusScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookingStatus.count(args as any)
    },
  },
)
