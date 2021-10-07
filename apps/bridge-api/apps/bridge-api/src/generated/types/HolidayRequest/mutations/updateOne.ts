import { mutationField, nonNull } from 'nexus'

export const HolidayRequestUpdateOneMutation = mutationField(
  'updateOneHolidayRequest',
  {
    type: nonNull('HolidayRequest'),
    args: {
      where: nonNull('HolidayRequestWhereUniqueInput'),
      data: nonNull('HolidayRequestUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.holidayRequest.update({
        where,
        data,
        ...select,
      })
    },
  },
)
