import { queryField, list } from 'nexus'

export const BookingSettingFindFirstQuery = queryField(
  'findFirstBookingSetting',
  {
    type: 'BookingSetting',
    args: {
      where: 'BookingSettingWhereInput',
      orderBy: list('BookingSettingOrderByWithRelationInput'),
      cursor: 'BookingSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BookingSettingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingSetting.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
