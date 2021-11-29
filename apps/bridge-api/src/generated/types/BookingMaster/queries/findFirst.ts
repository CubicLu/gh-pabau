import { queryField, list } from 'nexus'

export const BookingMasterFindFirstQuery = queryField(
  'findFirstBookingMaster',
  {
    type: 'BookingMaster',
    args: {
      where: 'BookingMasterWhereInput',
      orderBy: list('BookingMasterOrderByWithRelationInput'),
      cursor: 'BookingMasterWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BookingMasterScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingMaster.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
