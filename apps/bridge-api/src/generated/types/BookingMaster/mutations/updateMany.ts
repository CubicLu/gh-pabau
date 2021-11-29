import { mutationField, nonNull } from 'nexus'

export const BookingMasterUpdateManyMutation = mutationField(
  'updateManyBookingMaster',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('BookingMasterUpdateManyMutationInput'),
      where: 'BookingMasterWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookingMaster.updateMany(args as any)
    },
  },
)
