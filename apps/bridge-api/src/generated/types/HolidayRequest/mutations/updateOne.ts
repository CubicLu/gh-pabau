import { mutationField, nonNull } from 'nexus'

export const HolidayRequestUpdateOneMutation = mutationField(
  'updateOneHolidayRequest',
  {
    type: nonNull('HolidayRequest'),
    args: {
      data: nonNull('HolidayRequestUpdateInput'),
      where: nonNull('HolidayRequestWhereUniqueInput'),
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
