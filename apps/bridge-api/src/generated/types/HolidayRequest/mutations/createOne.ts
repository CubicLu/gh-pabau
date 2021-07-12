import { mutationField, nonNull } from 'nexus'

export const HolidayRequestCreateOneMutation = mutationField(
  'createOneHolidayRequest',
  {
    type: nonNull('HolidayRequest'),
    args: {
      data: nonNull('HolidayRequestCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.holidayRequest.create({
        data,
        ...select,
      })
    },
  },
)
