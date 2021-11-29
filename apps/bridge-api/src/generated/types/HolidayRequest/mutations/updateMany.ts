import { mutationField, nonNull } from 'nexus'

export const HolidayRequestUpdateManyMutation = mutationField(
  'updateManyHolidayRequest',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('HolidayRequestUpdateManyMutationInput'),
      where: 'HolidayRequestWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.holidayRequest.updateMany(args as any)
    },
  },
)
