import { mutationField, nonNull } from 'nexus'

export const PathwayStepsTakenDeleteOneMutation = mutationField(
  'deleteOnePathwayStepsTaken',
  {
    type: 'PathwayStepsTaken',
    args: {
      where: nonNull('PathwayStepsTakenWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.pathwayStepsTaken.delete({
        where,
        ...select,
      })
    },
  },
)
