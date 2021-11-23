import { mutationField, nonNull } from 'nexus'

export const BookingChangeLogDeleteOneMutation = mutationField(
  'deleteOneBookingChangeLog',
  {
    type: 'BookingChangeLog',
    args: {
      where: nonNull('BookingChangeLogWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.bookingChangeLog.delete({
        where,
        ...select,
      })
    },
  },
)
