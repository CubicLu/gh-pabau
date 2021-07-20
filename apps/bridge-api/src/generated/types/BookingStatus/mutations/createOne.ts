import { mutationField, nonNull } from 'nexus'

export const BookingStatusCreateOneMutation = mutationField(
  'createOneBookingStatus',
  {
    type: nonNull('BookingStatus'),
    args: {
      data: nonNull('BookingStatusCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.bookingStatus.create({
        data,
        ...select,
      })
    },
  },
)
