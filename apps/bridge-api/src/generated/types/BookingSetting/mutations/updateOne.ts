import { mutationField, nonNull } from 'nexus'

export const BookingSettingUpdateOneMutation = mutationField(
  'updateOneBookingSetting',
  {
    type: nonNull('BookingSetting'),
    args: {
      where: nonNull('BookingSettingWhereUniqueInput'),
      data: nonNull('BookingSettingUpdateInput'),
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
