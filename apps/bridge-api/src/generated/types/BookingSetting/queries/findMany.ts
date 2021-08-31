import { queryField, nonNull, list } from 'nexus'

export const BookingSettingFindManyQuery = queryField(
  'findManyBookingSetting',
  {
    type: nonNull(list(nonNull('BookingSetting'))),
    args: {
      where: 'BookingSettingWhereInput',
      orderBy: list('BookingSettingOrderByWithRelationInput'),
      cursor: 'BookingSettingWhereUniqueInput',
      distinct: 'BookingSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingSetting.findMany({
        ...args,
        ...select,
      })
    },
  },
)
