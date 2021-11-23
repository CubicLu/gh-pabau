import { mutationField, nonNull } from 'nexus'

export const BookingCancelCreateOneMutation = mutationField(
  'createOneBookingCancel',
  {
    type: nonNull('BookingCancel'),
    args: {
      data: nonNull('BookingCancelCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.bookingCancel.create({
        data,
        ...select,
      })
    },
  },
)
