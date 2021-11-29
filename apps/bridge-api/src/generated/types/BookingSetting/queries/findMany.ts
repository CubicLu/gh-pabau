import { queryField, nonNull, list } from 'nexus'

export const BookingSettingFindManyQuery = queryField(
  'findManyBookingSetting',
  {
    type: nonNull(list(nonNull('BookingSetting'))),
    args: {
      where: 'BookingSettingWhereInput',
      orderBy: list('BookingSettingOrderByWithRelationInput'),
      cursor: 'BookingSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BookingSettingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingSetting.findMany({
        ...args,
        ...select,
      })
    },
  },
)
