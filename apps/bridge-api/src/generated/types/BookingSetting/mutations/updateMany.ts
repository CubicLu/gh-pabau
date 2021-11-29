import { mutationField, nonNull } from 'nexus'

export const BookingSettingUpdateManyMutation = mutationField(
  'updateManyBookingSetting',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('BookingSettingUpdateManyMutationInput'),
      where: 'BookingSettingWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookingSetting.updateMany(args as any)
    },
  },
)
