import { mutationField, nonNull } from 'nexus'

export const BookingStatusUpdateOneMutation = mutationField(
  'updateOneBookingStatus',
  {
    type: nonNull('BookingStatus'),
    args: {
      data: nonNull('BookingStatusUpdateInput'),
      where: nonNull('BookingStatusWhereUniqueInput'),
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
