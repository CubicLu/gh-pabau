import { queryField, nonNull, list } from 'nexus'

export const BookingSettingFindCountQuery = queryField(
  'findManyBookingSettingCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'BookingSettingWhereInput',
      orderBy: list('BookingSettingOrderByWithRelationInput'),
      cursor: 'BookingSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BookingSettingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookingSetting.count(args as any)
    },
  },
)
