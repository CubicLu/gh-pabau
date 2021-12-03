import { queryField, list } from 'nexus'

export const BookingCancelAggregateQuery = queryField(
  'aggregateBookingCancel',
  {
    type: 'AggregateBookingCancel',
    args: {
      where: 'BookingCancelWhereInput',
      orderBy: list('BookingCancelOrderByWithRelationInput'),
      cursor: 'BookingCancelWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingCancel.aggregate({ ...args, ...select }) as any
    },
  },
)
