import { mutationField, nonNull } from 'nexus'

export const BookingSettingDeleteOneMutation = mutationField(
  'deleteOneBookingSetting',
  {
    type: 'BookingSetting',
    args: {
      where: nonNull('BookingSettingWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.bookingSetting.delete({
        where,
        ...select,
      })
    },
  },
)
