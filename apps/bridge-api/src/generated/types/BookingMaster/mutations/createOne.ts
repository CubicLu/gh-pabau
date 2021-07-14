import { mutationField, nonNull } from 'nexus'

export const BookingMasterCreateOneMutation = mutationField(
  'createOneBookingMaster',
  {
    type: nonNull('BookingMaster'),
    args: {
      data: nonNull('BookingMasterCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.bookingMaster.create({
        data,
        ...select,
      })
    },
  },
)
