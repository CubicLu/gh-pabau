import { mutationField, nonNull } from 'nexus'

export const BookingSettingCreateOneMutation = mutationField(
  'createOneBookingSetting',
  {
    type: nonNull('BookingSetting'),
    args: {
      data: nonNull('BookingSettingCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.bookingSetting.create({
        data,
        ...select,
      })
    },
  },
)
