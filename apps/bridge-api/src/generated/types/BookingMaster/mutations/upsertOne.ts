import { mutationField, nonNull } from 'nexus'

export const BookingMasterUpsertOneMutation = mutationField(
  'upsertOneBookingMaster',
  {
    type: nonNull('BookingMaster'),
    args: {
      where: nonNull('BookingMasterWhereUniqueInput'),
      create: nonNull('BookingMasterCreateInput'),
      update: nonNull('BookingMasterUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingMaster.upsert({
        ...args,
        ...select,
      })
    },
  },
)
