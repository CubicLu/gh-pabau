import { queryField, list } from 'nexus'

export const BookingStatusChangeFindFirstQuery = queryField(
  'findFirstBookingStatusChange',
  {
    type: 'BookingStatusChange',
    args: {
      where: 'BookingStatusChangeWhereInput',
      orderBy: list('BookingStatusChangeOrderByInput'),
      cursor: 'BookingStatusChangeWhereUniqueInput',
      distinct: 'BookingStatusChangeScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingStatusChange.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
