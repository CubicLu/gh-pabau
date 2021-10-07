import { queryField, list } from 'nexus'

export const BookingAggregateQuery = queryField('aggregateBooking', {
  type: 'AggregateBooking',
  args: {
    where: 'BookingWhereInput',
    orderBy: list('BookingOrderByWithRelationInput'),
    cursor: 'BookingWhereUniqueInput',
    distinct: 'BookingScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.booking.aggregate({ ...args, ...select }) as any
  },
})
