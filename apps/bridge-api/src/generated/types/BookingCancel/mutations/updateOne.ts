import { mutationField, nonNull } from 'nexus'

export const BookingCancelUpdateOneMutation = mutationField(
  'updateOneBookingCancel',
  {
    type: nonNull('BookingCancel'),
    args: {
      where: nonNull('BookingCancelWhereUniqueInput'),
      data: nonNull('BookingCancelUpdateInput'),
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
