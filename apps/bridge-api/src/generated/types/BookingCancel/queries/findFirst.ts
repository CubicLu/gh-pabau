import { queryField, list } from 'nexus'

export const BookingCancelFindFirstQuery = queryField(
  'findFirstBookingCancel',
  {
    type: 'BookingCancel',
    args: {
      where: 'BookingCancelWhereInput',
      orderBy: list('BookingCancelOrderByWithRelationInput'),
      cursor: 'BookingCancelWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BookingCancelScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingCancel.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
