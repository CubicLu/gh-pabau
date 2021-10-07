import { queryField, list } from 'nexus'

export const HolidayRequestAggregateQuery = queryField(
  'aggregateHolidayRequest',
  {
    type: 'AggregateHolidayRequest',
    args: {
      where: 'HolidayRequestWhereInput',
      orderBy: list('HolidayRequestOrderByWithRelationInput'),
      cursor: 'HolidayRequestWhereUniqueInput',
      distinct: 'HolidayRequestScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.holidayRequest.aggregate({ ...args, ...select }) as any
    },
  },
)
