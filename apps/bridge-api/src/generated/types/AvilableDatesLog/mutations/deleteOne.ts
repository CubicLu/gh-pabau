import { mutationField, nonNull } from 'nexus'

export const AvilableDatesLogDeleteOneMutation = mutationField(
  'deleteOneAvilableDatesLog',
  {
    type: 'AvilableDatesLog',
    args: {
      where: nonNull('AvilableDatesLogWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.avilableDatesLog.delete({
        where,
        ...select,
      })
    },
  },
)
