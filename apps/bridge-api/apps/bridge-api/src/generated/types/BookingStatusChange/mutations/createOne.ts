import { mutationField, nonNull } from 'nexus'

export const BookingStatusChangeCreateOneMutation = mutationField(
  'createOneBookingStatusChange',
  {
    type: nonNull('BookingStatusChange'),
    args: {
      data: nonNull('BookingStatusChangeCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.bookingStatusChange.create({
        data,
        ...select,
      })
    },
  },
)
