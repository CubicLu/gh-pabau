import { queryField, list } from 'nexus'

export const BookingMasterAggregateQuery = queryField(
  'aggregateBookingMaster',
  {
    type: 'AggregateBookingMaster',
    args: {
      where: 'BookingMasterWhereInput',
      orderBy: list('BookingMasterOrderByWithRelationInput'),
      cursor: 'BookingMasterWhereUniqueInput',
      distinct: 'BookingMasterScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingMaster.aggregate({ ...args, ...select }) as any
    },
  },
)
