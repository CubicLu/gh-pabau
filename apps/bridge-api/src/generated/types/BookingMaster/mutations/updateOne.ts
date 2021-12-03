import { mutationField, nonNull } from 'nexus'

export const BookingMasterUpdateOneMutation = mutationField(
  'updateOneBookingMaster',
  {
    type: nonNull('BookingMaster'),
    args: {
      data: nonNull('BookingMasterUpdateInput'),
      where: nonNull('BookingMasterWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.bookingMaster.update({
        where,
        data,
        ...select,
      })
    },
  },
)
