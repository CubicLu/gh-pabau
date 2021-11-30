import { queryField, nonNull, list } from 'nexus'

export const BookingFindCountQuery = queryField('findManyBookingCount', {
  type: nonNull('Int'),
  args: {
    where: 'BookingWhereInput',
    orderBy: list('BookingOrderByWithRelationInput'),
    cursor: 'BookingWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('BookingScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.booking.count(args as any)
  },
})
