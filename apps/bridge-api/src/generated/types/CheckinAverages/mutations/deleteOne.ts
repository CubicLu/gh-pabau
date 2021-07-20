import { mutationField, nonNull } from 'nexus'

export const CheckinAveragesDeleteOneMutation = mutationField(
  'deleteOneCheckinAverages',
  {
    type: 'CheckinAverages',
    args: {
      where: nonNull('CheckinAveragesWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.checkinAverages.delete({
        where,
        ...select,
      })
    },
  },
)
