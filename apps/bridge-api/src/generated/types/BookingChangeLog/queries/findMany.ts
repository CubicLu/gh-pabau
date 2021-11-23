import { queryField, nonNull, list } from 'nexus'

export const BookingChangeLogFindManyQuery = queryField(
  'findManyBookingChangeLog',
  {
    type: nonNull(list(nonNull('BookingChangeLog'))),
    args: {
      where: 'BookingChangeLogWhereInput',
      orderBy: list('BookingChangeLogOrderByWithRelationInput'),
      cursor: 'BookingChangeLogWhereUniqueInput',
      distinct: 'BookingChangeLogScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingChangeLog.findMany({
        ...args,
        ...select,
      })
    },
  },
)
