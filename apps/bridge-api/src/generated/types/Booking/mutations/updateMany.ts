import { mutationField, nonNull } from 'nexus'

export const BookingUpdateManyMutation = mutationField('updateManyBooking', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'BookingWhereInput',
    data: nonNull('BookingUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.booking.updateMany(args as any)
  },
})
