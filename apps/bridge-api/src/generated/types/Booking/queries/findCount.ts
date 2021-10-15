import { queryField, nonNull, list } from 'nexus'

export const BookingFindCountQuery = queryField('findManyBookingCount', {
  type: nonNull('Int'),
  args: {
    where: 'BookingWhereInput',
    orderBy: list('BookingOrderByInput'),
    cursor: 'BookingWhereUniqueInput',
    distinct: 'BookingScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.booking.count(args as any)
  },
})
