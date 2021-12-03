import { mutationField, nonNull } from 'nexus'

export const BookingStatusUpdateManyMutation = mutationField(
  'updateManyBookingStatus',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('BookingStatusUpdateManyMutationInput'),
      where: 'BookingStatusWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookingStatus.updateMany(args as any)
    },
  },
)
