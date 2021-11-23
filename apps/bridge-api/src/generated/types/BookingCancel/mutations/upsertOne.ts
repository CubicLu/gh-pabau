import { mutationField, nonNull } from 'nexus'

export const BookingCancelUpsertOneMutation = mutationField(
  'upsertOneBookingCancel',
  {
    type: nonNull('BookingCancel'),
    args: {
      where: nonNull('BookingCancelWhereUniqueInput'),
      create: nonNull('BookingCancelCreateInput'),
      update: nonNull('BookingCancelUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingCancel.upsert({
        ...args,
        ...select,
      })
    },
  },
)
