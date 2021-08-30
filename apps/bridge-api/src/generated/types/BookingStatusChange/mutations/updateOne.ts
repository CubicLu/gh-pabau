import { mutationField, nonNull } from 'nexus'

export const BookingStatusChangeUpdateOneMutation = mutationField(
  'updateOneBookingStatusChange',
  {
    type: nonNull('BookingStatusChange'),
    args: {
      where: nonNull('BookingStatusChangeWhereUniqueInput'),
      data: nonNull('BookingStatusChangeUpdateInput'),
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
