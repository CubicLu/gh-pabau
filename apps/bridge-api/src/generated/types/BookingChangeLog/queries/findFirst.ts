import { queryField, list } from 'nexus'

export const BookingChangeLogFindFirstQuery = queryField(
  'findFirstBookingChangeLog',
  {
    type: 'BookingChangeLog',
    args: {
      where: 'BookingChangeLogWhereInput',
      orderBy: list('BookingChangeLogOrderByWithRelationInput'),
      cursor: 'BookingChangeLogWhereUniqueInput',
      distinct: 'BookingChangeLogScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingChangeLog.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
