import { queryField, nonNull, list } from 'nexus'

export const BookingStatusChangeFindCountQuery = queryField(
  'findManyBookingStatusChangeCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'BookingStatusChangeWhereInput',
      orderBy: list('BookingStatusChangeOrderByInput'),
      cursor: 'BookingStatusChangeWhereUniqueInput',
      distinct: 'BookingStatusChangeScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookingStatusChange.count(args as any)
    },
  },
)
