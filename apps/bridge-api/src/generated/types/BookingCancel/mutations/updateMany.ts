import { mutationField, nonNull } from 'nexus'

export const BookingCancelUpdateManyMutation = mutationField(
  'updateManyBookingCancel',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'BookingCancelWhereInput',
      data: nonNull('BookingCancelUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookingCancel.updateMany(args as any)
    },
  },
)
