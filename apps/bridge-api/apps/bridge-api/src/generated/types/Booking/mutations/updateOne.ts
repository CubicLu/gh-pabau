import { mutationField, nonNull } from 'nexus'

export const BookingUpdateOneMutation = mutationField('updateOneBooking', {
  type: nonNull('Booking'),
  args: {
    where: nonNull('BookingWhereUniqueInput'),
    data: nonNull('BookingUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.booking.update({
      where,
      data,
      ...select,
    })
  },
})
