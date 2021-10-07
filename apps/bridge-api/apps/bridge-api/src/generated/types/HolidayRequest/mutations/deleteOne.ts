import { mutationField, nonNull } from 'nexus'

export const HolidayRequestDeleteOneMutation = mutationField(
  'deleteOneHolidayRequest',
  {
    type: 'HolidayRequest',
    args: {
      where: nonNull('HolidayRequestWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.holidayRequest.delete({
        where,
        ...select,
      })
    },
  },
)
