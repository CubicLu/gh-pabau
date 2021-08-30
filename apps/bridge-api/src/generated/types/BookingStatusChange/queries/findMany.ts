import { queryField, nonNull, list } from 'nexus'

export const BookingStatusChangeFindManyQuery = queryField(
  'findManyBookingStatusChange',
  {
    type: nonNull(list(nonNull('BookingStatusChange'))),
    args: {
      where: 'BookingStatusChangeWhereInput',
      orderBy: list('BookingStatusChangeOrderByWithRelationInput'),
      cursor: 'BookingStatusChangeWhereUniqueInput',
      distinct: 'BookingStatusChangeScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingStatusChange.findMany({
        ...args,
        ...select,
      })
    },
  },
)
