import { mutationField, nonNull } from 'nexus'

export const BookingCancelUpdateManyMutation = mutationField(
  'updateManyBookingCancel',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('BookingCancelUpdateManyMutationInput'),
      where: 'BookingCancelWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookingCancel.updateMany(args as any)
    },
  },
)
