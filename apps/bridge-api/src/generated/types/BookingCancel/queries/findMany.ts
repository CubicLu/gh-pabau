import { queryField, nonNull, list } from 'nexus'

export const BookingCancelFindManyQuery = queryField('findManyBookingCancel', {
  type: nonNull(list(nonNull('BookingCancel'))),
  args: {
    where: 'BookingCancelWhereInput',
    orderBy: list('BookingCancelOrderByWithRelationInput'),
    cursor: 'BookingCancelWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('BookingCancelScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bookingCancel.findMany({
      ...args,
      ...select,
    })
  },
})
