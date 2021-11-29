import { queryField, nonNull, list } from 'nexus'

export const BookingCancelFindCountQuery = queryField(
  'findManyBookingCancelCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'BookingCancelWhereInput',
      orderBy: list('BookingCancelOrderByWithRelationInput'),
      cursor: 'BookingCancelWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BookingCancelScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookingCancel.count(args as any)
    },
  },
)
