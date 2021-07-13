import { mutationField, nonNull } from 'nexus'

export const BookingStatusUpdateManyMutation = mutationField(
  'updateManyBookingStatus',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'BookingStatusWhereInput',
      data: nonNull('BookingStatusUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookingStatus.updateMany(args as any)
    },
  },
)
