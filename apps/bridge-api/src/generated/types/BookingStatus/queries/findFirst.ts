import { queryField, list } from 'nexus'

export const BookingStatusFindFirstQuery = queryField(
  'findFirstBookingStatus',
  {
    type: 'BookingStatus',
    args: {
      where: 'BookingStatusWhereInput',
      orderBy: list('BookingStatusOrderByWithRelationInput'),
      cursor: 'BookingStatusWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BookingStatusScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingStatus.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
