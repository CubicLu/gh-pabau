import { mutationField, nonNull } from 'nexus'

export const PathwayStepsCreateOneMutation = mutationField(
  'createOnePathwaySteps',
  {
    type: nonNull('PathwaySteps'),
    args: {
      data: nonNull('PathwayStepsCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.pathwaySteps.create({
        data,
        ...select,
      })
    },
  },
)
