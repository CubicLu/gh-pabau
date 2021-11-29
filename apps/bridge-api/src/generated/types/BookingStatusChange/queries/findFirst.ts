import { queryField, list } from 'nexus'

export const BookingStatusChangeFindFirstQuery = queryField(
  'findFirstBookingStatusChange',
  {
    type: 'BookingStatusChange',
    args: {
      where: 'BookingStatusChangeWhereInput',
      orderBy: list('BookingStatusChangeOrderByWithRelationInput'),
      cursor: 'BookingStatusChangeWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BookingStatusChangeScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingStatusChange.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
