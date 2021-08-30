import { mutationField, nonNull } from 'nexus'

export const AtQuizTakeDeleteOneMutation = mutationField(
  'deleteOneAtQuizTake',
  {
    type: 'AtQuizTake',
    args: {
      where: nonNull('AtQuizTakeWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.atQuizTake.delete({
        where,
        ...select,
      })
    },
  },
)
