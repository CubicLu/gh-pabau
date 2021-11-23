import { queryField, nonNull, list } from 'nexus'

export const BookingChangeLogFindCountQuery = queryField(
  'findManyBookingChangeLogCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'BookingChangeLogWhereInput',
      orderBy: list('BookingChangeLogOrderByWithRelationInput'),
      cursor: 'BookingChangeLogWhereUniqueInput',
      distinct: 'BookingChangeLogScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookingChangeLog.count(args as any)
    },
  },
)
