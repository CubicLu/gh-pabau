import { mutationField, nonNull } from 'nexus'

export const BookingChangeLogUpdateManyMutation = mutationField(
  'updateManyBookingChangeLog',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'BookingChangeLogWhereInput',
      data: nonNull('BookingChangeLogUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookingChangeLog.updateMany(args as any)
    },
  },
)
