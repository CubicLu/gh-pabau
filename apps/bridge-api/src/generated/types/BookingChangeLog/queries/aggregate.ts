import { queryField, list } from 'nexus'

export const BookingChangeLogAggregateQuery = queryField(
  'aggregateBookingChangeLog',
  {
    type: 'AggregateBookingChangeLog',
    args: {
      where: 'BookingChangeLogWhereInput',
      orderBy: list('BookingChangeLogOrderByWithRelationInput'),
      cursor: 'BookingChangeLogWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingChangeLog.aggregate({ ...args, ...select }) as any
    },
  },
)
