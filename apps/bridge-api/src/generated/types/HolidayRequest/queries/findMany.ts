import { queryField, nonNull, list } from 'nexus'

export const HolidayRequestFindManyQuery = queryField(
  'findManyHolidayRequest',
  {
    type: nonNull(list(nonNull('HolidayRequest'))),
    args: {
      where: 'HolidayRequestWhereInput',
      orderBy: list('HolidayRequestOrderByWithRelationInput'),
      cursor: 'HolidayRequestWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('HolidayRequestScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.holidayRequest.findMany({
        ...args,
        ...select,
      })
    },
  },
)
