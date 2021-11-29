import { queryField, nonNull, list } from 'nexus'

export const BookingMasterFindManyQuery = queryField('findManyBookingMaster', {
  type: nonNull(list(nonNull('BookingMaster'))),
  args: {
    where: 'BookingMasterWhereInput',
    orderBy: list('BookingMasterOrderByWithRelationInput'),
    cursor: 'BookingMasterWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('BookingMasterScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bookingMaster.findMany({
      ...args,
      ...select,
    })
  },
})
