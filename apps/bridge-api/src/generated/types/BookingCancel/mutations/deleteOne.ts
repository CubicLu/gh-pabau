import { mutationField, nonNull } from 'nexus'

export const BookingCancelDeleteOneMutation = mutationField(
  'deleteOneBookingCancel',
  {
    type: 'BookingCancel',
    args: {
      where: nonNull('BookingCancelWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.bookingCancel.delete({
        where,
        ...select,
      })
    },
  },
)
