import { queryField, list } from 'nexus'

export const HolidayRequestFindFirstQuery = queryField(
  'findFirstHolidayRequest',
  {
    type: 'HolidayRequest',
    args: {
      where: 'HolidayRequestWhereInput',
      orderBy: list('HolidayRequestOrderByWithRelationInput'),
      cursor: 'HolidayRequestWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('HolidayRequestScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.holidayRequest.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
