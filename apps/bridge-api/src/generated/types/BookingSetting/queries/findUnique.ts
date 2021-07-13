import { queryField, nonNull } from 'nexus'

export const BookingSettingFindUniqueQuery = queryField(
  'findUniqueBookingSetting',
  {
    type: 'BookingSetting',
    args: {
      where: nonNull('BookingSettingWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.bookingSetting.findUnique({
        where,
        ...select,
      })
    },
  },
)
