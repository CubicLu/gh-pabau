import { mutationField, nonNull } from 'nexus'

export const BookingUpdateManyMutation = mutationField('updateManyBooking', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('BookingUpdateManyMutationInput'),
    where: 'BookingWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.booking.updateMany(args as any)
  },
})
