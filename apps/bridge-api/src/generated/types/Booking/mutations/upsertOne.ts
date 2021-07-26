import { mutationField, nonNull } from 'nexus'

export const BookingUpsertOneMutation = mutationField('upsertOneBooking', {
  type: nonNull('Booking'),
  args: {
    where: nonNull('BookingWhereUniqueInput'),
    create: nonNull('BookingCreateInput'),
    update: nonNull('BookingUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.booking.upsert({
      ...args,
      ...select,
    })
  },
})
