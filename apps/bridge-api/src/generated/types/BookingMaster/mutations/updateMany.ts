import { mutationField, nonNull } from 'nexus'

export const BookingMasterUpdateManyMutation = mutationField(
  'updateManyBookingMaster',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'BookingMasterWhereInput',
      data: nonNull('BookingMasterUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookingMaster.updateMany(args as any)
    },
  },
)
