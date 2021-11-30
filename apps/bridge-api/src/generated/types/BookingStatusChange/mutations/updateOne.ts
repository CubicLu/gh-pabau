import { mutationField, nonNull } from 'nexus'

export const BookingStatusChangeUpdateOneMutation = mutationField(
  'updateOneBookingStatusChange',
  {
    type: nonNull('BookingStatusChange'),
    args: {
      data: nonNull('BookingStatusChangeUpdateInput'),
      where: nonNull('BookingStatusChangeWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.bookingStatusChange.update({
        where,
        data,
        ...select,
      })
    },
  },
)
