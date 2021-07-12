import { mutationField, nonNull } from 'nexus'

export const CheckinAveragesIdleDeleteOneMutation = mutationField(
  'deleteOneCheckinAveragesIdle',
  {
    type: 'CheckinAveragesIdle',
    args: {
      where: nonNull('CheckinAveragesIdleWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.checkinAveragesIdle.delete({
        where,
        ...select,
      })
    },
  },
)
