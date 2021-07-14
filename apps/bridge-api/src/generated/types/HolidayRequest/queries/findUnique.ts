import { queryField, nonNull } from 'nexus'

export const HolidayRequestFindUniqueQuery = queryField(
  'findUniqueHolidayRequest',
  {
    type: 'HolidayRequest',
    args: {
      where: nonNull('HolidayRequestWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.holidayRequest.findUnique({
        where,
        ...select,
      })
    },
  },
)
