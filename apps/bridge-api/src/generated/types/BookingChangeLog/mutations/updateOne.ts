import { mutationField, nonNull } from 'nexus'

export const BookingChangeLogUpdateOneMutation = mutationField(
  'updateOneBookingChangeLog',
  {
    type: nonNull('BookingChangeLog'),
    args: {
      data: nonNull('BookingChangeLogUpdateInput'),
      where: nonNull('BookingChangeLogWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.bookingChangeLog.update({
        where,
        data,
        ...select,
      })
    },
  },
)
