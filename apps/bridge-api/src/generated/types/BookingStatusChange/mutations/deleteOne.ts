import { mutationField, nonNull } from 'nexus'

export const BookingStatusChangeDeleteOneMutation = mutationField(
  'deleteOneBookingStatusChange',
  {
    type: 'BookingStatusChange',
    args: {
      where: nonNull('BookingStatusChangeWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.bookingStatusChange.delete({
        where,
        ...select,
      })
    },
  },
)
