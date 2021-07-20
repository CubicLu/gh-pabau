import { mutationField, nonNull } from 'nexus'

export const BookingStatusUpdateOneMutation = mutationField(
  'updateOneBookingStatus',
  {
    type: nonNull('BookingStatus'),
    args: {
      where: nonNull('BookingStatusWhereUniqueInput'),
      data: nonNull('BookingStatusUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.bookingStatus.update({
        where,
        data,
        ...select,
      })
    },
  },
)
