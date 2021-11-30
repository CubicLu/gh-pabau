import { queryField, nonNull, list } from 'nexus'

export const HolidayRequestFindCountQuery = queryField(
  'findManyHolidayRequestCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'HolidayRequestWhereInput',
      orderBy: list('HolidayRequestOrderByWithRelationInput'),
      cursor: 'HolidayRequestWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('HolidayRequestScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.holidayRequest.count(args as any)
    },
  },
)
