import { queryField, nonNull, list } from 'nexus'

export const BookingChangeLogFindCountQuery = queryField(
  'findManyBookingChangeLogCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'BookingChangeLogWhereInput',
      orderBy: list('BookingChangeLogOrderByWithRelationInput'),
      cursor: 'BookingChangeLogWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BookingChangeLogScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookingChangeLog.count(args as any)
    },
  },
)
