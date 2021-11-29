import { mutationField, nonNull } from 'nexus'

export const BookingChangeLogUpdateManyMutation = mutationField(
  'updateManyBookingChangeLog',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('BookingChangeLogUpdateManyMutationInput'),
      where: 'BookingChangeLogWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookingChangeLog.updateMany(args as any)
    },
  },
)
