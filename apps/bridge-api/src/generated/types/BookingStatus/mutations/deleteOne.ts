import { mutationField, nonNull } from 'nexus'

export const BookingStatusDeleteOneMutation = mutationField(
  'deleteOneBookingStatus',
  {
    type: 'BookingStatus',
    args: {
      where: nonNull('BookingStatusWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.bookingStatus.delete({
        where,
        ...select,
      })
    },
  },
)
