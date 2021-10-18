import { mutationField, nonNull } from 'nexus'

export const PathwayStepsDeleteOneMutation = mutationField(
  'deleteOnePathwaySteps',
  {
    type: 'PathwaySteps',
    args: {
      where: nonNull('PathwayStepsWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.pathwaySteps.delete({
        where,
        ...select,
      })
    },
  },
)
