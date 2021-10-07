import { queryField, list } from 'nexus'

export const BookingSettingAggregateQuery = queryField(
  'aggregateBookingSetting',
  {
    type: 'AggregateBookingSetting',
    args: {
      where: 'BookingSettingWhereInput',
      orderBy: list('BookingSettingOrderByWithRelationInput'),
      cursor: 'BookingSettingWhereUniqueInput',
      distinct: 'BookingSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookingSetting.aggregate({ ...args, ...select }) as any
    },
  },
)
