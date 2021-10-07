import { queryField, list } from 'nexus'

export const BookingStatusAggregateQuery = queryField(
  'aggregateBookingStatus',
  {
    type: 'AggregateBookingStatus',
    args: {
      where: 'BookingStatusWhereInput',
      orderBy: list('BookingStatusOrderByWithRelationInput'),
      cursor: 'BookingStatusWhereUniqueInput',
      distinct: 'BookingStatusScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingStatus.aggregate({ ...args, ...select }) as any
    },
  },
)
