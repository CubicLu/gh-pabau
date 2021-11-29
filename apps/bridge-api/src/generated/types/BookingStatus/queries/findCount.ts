import { queryField, nonNull, list } from 'nexus'

export const BookingStatusFindCountQuery = queryField(
  'findManyBookingStatusCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'BookingStatusWhereInput',
      orderBy: list('BookingStatusOrderByWithRelationInput'),
      cursor: 'BookingStatusWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BookingStatusScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookingStatus.count(args as any)
    },
  },
)
