import { mutationField, nonNull } from 'nexus'

export const BookingMasterDeleteOneMutation = mutationField(
  'deleteOneBookingMaster',
  {
    type: 'BookingMaster',
    args: {
      where: nonNull('BookingMasterWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.bookingMaster.delete({
        where,
        ...select,
      })
    },
  },
)
