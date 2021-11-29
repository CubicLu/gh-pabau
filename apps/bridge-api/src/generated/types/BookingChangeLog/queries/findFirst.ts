import { queryField, list } from 'nexus'

export const BookingChangeLogFindFirstQuery = queryField(
  'findFirstBookingChangeLog',
  {
    type: 'BookingChangeLog',
    args: {
      where: 'BookingChangeLogWhereInput',
      orderBy: list('BookingChangeLogOrderByWithRelationInput'),
      cursor: 'BookingChangeLogWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BookingChangeLogScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingChangeLog.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
