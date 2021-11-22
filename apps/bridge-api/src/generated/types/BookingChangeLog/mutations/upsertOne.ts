import { mutationField, nonNull } from 'nexus'

export const BookingChangeLogUpsertOneMutation = mutationField(
  'upsertOneBookingChangeLog',
  {
    type: nonNull('BookingChangeLog'),
    args: {
      where: nonNull('BookingChangeLogWhereUniqueInput'),
      create: nonNull('BookingChangeLogCreateInput'),
      update: nonNull('BookingChangeLogUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingChangeLog.upsert({
        ...args,
        ...select,
      })
    },
  },
)
