import { queryField, nonNull, list } from 'nexus'

export const BookingStatusChangeFindCountQuery = queryField(
  'findManyBookingStatusChangeCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'BookingStatusChangeWhereInput',
      orderBy: list('BookingStatusChangeOrderByWithRelationInput'),
      cursor: 'BookingStatusChangeWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BookingStatusChangeScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookingStatusChange.count(args as any)
    },
  },
)
