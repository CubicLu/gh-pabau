import { mutationField, nonNull } from 'nexus'

export const BookingDeleteOneMutation = mutationField('deleteOneBooking', {
  type: 'Booking',
  args: {
    where: nonNull('BookingWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.booking.delete({
      where,
      ...select,
    })
  },
})
