import { queryField, nonNull, list } from 'nexus'

export const HolidayRequestFindCountQuery = queryField(
  'findManyHolidayRequestCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'HolidayRequestWhereInput',
      orderBy: list('HolidayRequestOrderByInput'),
      cursor: 'HolidayRequestWhereUniqueInput',
      distinct: 'HolidayRequestScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.holidayRequest.count(args as any)
    },
  },
)
