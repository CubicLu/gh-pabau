import { mutationField, nonNull } from 'nexus'

export const BookingMasterUpdateOneMutation = mutationField(
  'updateOneBookingMaster',
  {
    type: nonNull('BookingMaster'),
    args: {
      where: nonNull('BookingMasterWhereUniqueInput'),
      data: nonNull('BookingMasterUpdateInput'),
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
