import { mutationField, nonNull } from 'nexus'

export const BookingStatusChangeUpdateManyMutation = mutationField(
  'updateManyBookingStatusChange',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'BookingStatusChangeWhereInput',
      data: nonNull('BookingStatusChangeUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookingStatusChange.updateMany(args as any)
    },
  },
)
