import { mutationField, nonNull } from 'nexus'

export const HolidayRequestUpsertOneMutation = mutationField(
  'upsertOneHolidayRequest',
  {
    type: nonNull('HolidayRequest'),
    args: {
      where: nonNull('HolidayRequestWhereUniqueInput'),
      create: nonNull('HolidayRequestCreateInput'),
      update: nonNull('HolidayRequestUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.holidayRequest.upsert({
        ...args,
        ...select,
      })
    },
  },
)
