import { mutationField, nonNull } from 'nexus'

export const BookingCancelUpdateOneMutation = mutationField(
  'updateOneBookingCancel',
  {
    type: nonNull('BookingCancel'),
    args: {
      data: nonNull('BookingCancelUpdateInput'),
      where: nonNull('BookingCancelWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.bookingCancel.update({
        where,
        data,
        ...select,
      })
    },
  },
)
