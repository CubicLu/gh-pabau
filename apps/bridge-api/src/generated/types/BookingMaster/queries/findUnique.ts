import { queryField, nonNull } from 'nexus'

export const BookingMasterFindUniqueQuery = queryField(
  'findUniqueBookingMaster',
  {
    type: 'BookingMaster',
    args: {
      where: nonNull('BookingMasterWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.bookingMaster.findUnique({
        where,
        ...select,
      })
    },
  },
)
