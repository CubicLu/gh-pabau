import { mutationField, nonNull } from 'nexus'

export const BookingCreateOneMutation = mutationField('createOneBooking', {
  type: nonNull('Booking'),
  args: {
    data: nonNull('BookingCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.booking.create({
      data,
      ...select,
    })
  },
})
