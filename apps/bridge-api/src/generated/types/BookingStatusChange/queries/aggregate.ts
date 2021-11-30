import { queryField, list } from 'nexus'

export const BookingStatusChangeAggregateQuery = queryField(
  'aggregateBookingStatusChange',
  {
    type: 'AggregateBookingStatusChange',
    args: {
      where: 'BookingStatusChangeWhereInput',
      orderBy: list('BookingStatusChangeOrderByWithRelationInput'),
      cursor: 'BookingStatusChangeWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingStatusChange.aggregate({ ...args, ...select }) as any
    },
  },
)
