import { mutationField, nonNull } from 'nexus'

export const BookingSettingUpsertOneMutation = mutationField(
  'upsertOneBookingSetting',
  {
    type: nonNull('BookingSetting'),
    args: {
      where: nonNull('BookingSettingWhereUniqueInput'),
      create: nonNull('BookingSettingCreateInput'),
      update: nonNull('BookingSettingUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingSetting.upsert({
        ...args,
        ...select,
      })
    },
  },
)
