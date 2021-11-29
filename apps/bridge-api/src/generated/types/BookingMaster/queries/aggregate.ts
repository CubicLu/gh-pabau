import { queryField, list } from 'nexus'

export const BookingMasterAggregateQuery = queryField(
  'aggregateBookingMaster',
  {
    type: 'AggregateBookingMaster',
    args: {
      where: 'BookingMasterWhereInput',
      orderBy: list('BookingMasterOrderByWithRelationInput'),
      cursor: 'BookingMasterWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingMaster.aggregate({ ...args, ...select }) as any
    },
  },
)
