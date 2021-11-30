import { mutationField, nonNull } from 'nexus'

export const BookingSettingUpdateOneMutation = mutationField(
  'updateOneBookingSetting',
  {
    type: nonNull('BookingSetting'),
    args: {
      data: nonNull('BookingSettingUpdateInput'),
      where: nonNull('BookingSettingWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.bookingSetting.update({
        where,
        data,
        ...select,
      })
    },
  },
)
