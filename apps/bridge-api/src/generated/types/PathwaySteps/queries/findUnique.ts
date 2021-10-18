import { queryField, nonNull } from 'nexus'

export const PathwayStepsFindUniqueQuery = queryField(
  'findUniquePathwaySteps',
  {
    type: 'PathwaySteps',
    args: {
      where: nonNull('PathwayStepsWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.pathwaySteps.findUnique({
        where,
        ...select,
      })
    },
  },
)
