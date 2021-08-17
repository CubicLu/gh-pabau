import { queryField, list } from 'nexus'

export const BookingSettingFindFirstQuery = queryField(
  'findFirstBookingSetting',
  {
    type: 'BookingSetting',
    args: {
      where: 'BookingSettingWhereInput',
      orderBy: list('BookingSettingOrderByInput'),
      cursor: 'BookingSettingWhereUniqueInput',
      distinct: 'BookingSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingSetting.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
