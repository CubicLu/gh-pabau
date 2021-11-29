import { mutationField, nonNull } from 'nexus'

export const BookingUpdateOneMutation = mutationField('updateOneBooking', {
  type: nonNull('Booking'),
  args: {
    data: nonNull('BookingUpdateInput'),
    where: nonNull('BookingWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.booking.update({
      where,
      data,
      ...select,
    })
  },
})
