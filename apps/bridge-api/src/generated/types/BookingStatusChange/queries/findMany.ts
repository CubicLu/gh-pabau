import { queryField, nonNull, list } from 'nexus'

export const BookingStatusChangeFindManyQuery = queryField(
  'findManyBookingStatusChange',
  {
    type: nonNull(list(nonNull('BookingStatusChange'))),
    args: {
      where: 'BookingStatusChangeWhereInput',
      orderBy: list('BookingStatusChangeOrderByWithRelationInput'),
      cursor: 'BookingStatusChangeWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BookingStatusChangeScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingStatusChange.findMany({
        ...args,
        ...select,
      })
    },
  },
)
