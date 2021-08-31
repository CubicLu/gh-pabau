import { queryField, list } from 'nexus'

export const BookingMasterFindFirstQuery = queryField(
  'findFirstBookingMaster',
  {
    type: 'BookingMaster',
    args: {
      where: 'BookingMasterWhereInput',
      orderBy: list('BookingMasterOrderByWithRelationInput'),
      cursor: 'BookingMasterWhereUniqueInput',
      distinct: 'BookingMasterScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingMaster.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
