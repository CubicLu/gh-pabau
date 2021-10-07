import { queryField, nonNull, list } from 'nexus'

export const BookingSettingFindCountQuery = queryField(
  'findManyBookingSettingCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'BookingSettingWhereInput',
      orderBy: list('BookingSettingOrderByWithRelationInput'),
      cursor: 'BookingSettingWhereUniqueInput',
      distinct: 'BookingSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookingSetting.count(args as any)
    },
  },
)
