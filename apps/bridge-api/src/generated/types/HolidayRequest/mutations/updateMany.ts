import { mutationField, nonNull } from 'nexus'

export const HolidayRequestUpdateManyMutation = mutationField(
  'updateManyHolidayRequest',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'HolidayRequestWhereInput',
      data: nonNull('HolidayRequestUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.holidayRequest.updateMany(args as any)
    },
  },
)
