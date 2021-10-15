import { queryField, nonNull, list } from 'nexus'

export const BookingMasterFindManyQuery = queryField('findManyBookingMaster', {
  type: nonNull(list(nonNull('BookingMaster'))),
  args: {
    where: 'BookingMasterWhereInput',
    orderBy: list('BookingMasterOrderByInput'),
    cursor: 'BookingMasterWhereUniqueInput',
    distinct: 'BookingMasterScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bookingMaster.findMany({
      ...args,
      ...select,
    })
  },
})
