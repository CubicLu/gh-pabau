import { mutationField, nonNull } from 'nexus'

export const BookingChangeLogUpdateOneMutation = mutationField(
  'updateOneBookingChangeLog',
  {
    type: nonNull('BookingChangeLog'),
    args: {
      where: nonNull('BookingChangeLogWhereUniqueInput'),
      data: nonNull('BookingChangeLogUpdateInput'),
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
