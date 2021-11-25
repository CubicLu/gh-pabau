import { queryField, nonNull, list } from 'nexus'

export const BookingCancelFindManyQuery = queryField('findManyBookingCancel', {
  type: nonNull(list(nonNull('BookingCancel'))),
  args: {
    where: 'BookingCancelWhereInput',
    orderBy: list('BookingCancelOrderByWithRelationInput'),
    cursor: 'BookingCancelWhereUniqueInput',
    distinct: 'BookingCancelScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bookingCancel.findMany({
      ...args,
      ...select,
    })
  },
})
