import { queryField, list } from 'nexus'

export const HolidayRequestFindFirstQuery = queryField(
  'findFirstHolidayRequest',
  {
    type: 'HolidayRequest',
    args: {
      where: 'HolidayRequestWhereInput',
      orderBy: list('HolidayRequestOrderByWithRelationInput'),
      cursor: 'HolidayRequestWhereUniqueInput',
      distinct: 'HolidayRequestScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.holidayRequest.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
