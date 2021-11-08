import { queryField, list } from 'nexus'

export const BookingCancelFindFirstQuery = queryField(
  'findFirstBookingCancel',
  {
    type: 'BookingCancel',
    args: {
      where: 'BookingCancelWhereInput',
      orderBy: list('BookingCancelOrderByWithRelationInput'),
      cursor: 'BookingCancelWhereUniqueInput',
      distinct: 'BookingCancelScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingCancel.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
