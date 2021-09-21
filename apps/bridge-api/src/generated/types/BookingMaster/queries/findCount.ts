import { queryField, nonNull, list } from 'nexus'

export const BookingMasterFindCountQuery = queryField(
  'findManyBookingMasterCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'BookingMasterWhereInput',
      orderBy: list('BookingMasterOrderByWithRelationInput'),
      cursor: 'BookingMasterWhereUniqueInput',
      distinct: 'BookingMasterScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookingMaster.count(args as any)
    },
  },
)
