import { mutationField, nonNull } from 'nexus'

export const PathwayStepDeleteOneMutation = mutationField(
  'deleteOnePathwayStep',
  {
    type: 'PathwayStep',
    args: {
      where: nonNull('PathwayStepWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.pathwayStep.delete({
        where,
        ...select,
      })
    },
  },
)
