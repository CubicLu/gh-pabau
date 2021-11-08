import { mutationField, nonNull } from 'nexus'

export const BookingChangeLogCreateOneMutation = mutationField(
  'createOneBookingChangeLog',
  {
    type: nonNull('BookingChangeLog'),
    args: {
      data: nonNull('BookingChangeLogCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.bookingChangeLog.create({
        data,
        ...select,
      })
    },
  },
)
