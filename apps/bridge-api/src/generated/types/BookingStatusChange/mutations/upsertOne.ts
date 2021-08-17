import { mutationField, nonNull } from 'nexus'

export const BookingStatusChangeUpsertOneMutation = mutationField(
  'upsertOneBookingStatusChange',
  {
    type: nonNull('BookingStatusChange'),
    args: {
      where: nonNull('BookingStatusChangeWhereUniqueInput'),
      create: nonNull('BookingStatusChangeCreateInput'),
      update: nonNull('BookingStatusChangeUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingStatusChange.upsert({
        ...args,
        ...select,
      })
    },
  },
)
