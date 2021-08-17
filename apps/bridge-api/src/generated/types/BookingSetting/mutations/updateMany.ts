import { mutationField, nonNull } from 'nexus'

export const BookingSettingUpdateManyMutation = mutationField(
  'updateManyBookingSetting',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'BookingSettingWhereInput',
      data: nonNull('BookingSettingUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookingSetting.updateMany(args as any)
    },
  },
)
