import { mutationField, nonNull } from 'nexus'

export const BookingStatusChangeUpdateManyMutation = mutationField(
  'updateManyBookingStatusChange',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('BookingStatusChangeUpdateManyMutationInput'),
      where: 'BookingStatusChangeWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookingStatusChange.updateMany(args as any)
    },
  },
)
