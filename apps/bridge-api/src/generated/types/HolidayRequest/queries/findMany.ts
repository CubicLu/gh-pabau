import { queryField, nonNull, list } from 'nexus'

export const HolidayRequestFindManyQuery = queryField(
  'findManyHolidayRequest',
  {
    type: nonNull(list(nonNull('HolidayRequest'))),
    args: {
      where: 'HolidayRequestWhereInput',
      orderBy: list('HolidayRequestOrderByInput'),
      cursor: 'HolidayRequestWhereUniqueInput',
      distinct: 'HolidayRequestScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.holidayRequest.findMany({
        ...args,
        ...select,
      })
    },
  },
)
