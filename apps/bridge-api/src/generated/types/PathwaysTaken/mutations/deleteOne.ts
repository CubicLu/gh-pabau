import { mutationField, nonNull } from 'nexus'

export const PathwaysTakenDeleteOneMutation = mutationField(
  'deleteOnePathwaysTaken',
  {
    type: 'PathwaysTaken',
    args: {
      where: nonNull('PathwaysTakenWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.pathwaysTaken.delete({
        where,
        ...select,
      })
    },
  },
)
