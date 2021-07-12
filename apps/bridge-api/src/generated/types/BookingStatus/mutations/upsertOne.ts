import { mutationField, nonNull } from 'nexus'

export const BookingStatusUpsertOneMutation = mutationField(
  'upsertOneBookingStatus',
  {
    type: nonNull('BookingStatus'),
    args: {
      where: nonNull('BookingStatusWhereUniqueInput'),
      create: nonNull('BookingStatusCreateInput'),
      update: nonNull('BookingStatusUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingStatus.upsert({
        ...args,
        ...select,
      })
    },
  },
)
