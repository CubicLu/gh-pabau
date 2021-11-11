import { queryField, nonNull } from 'nexus'

export const PathwayStepFindUniqueQuery = queryField('findUniquePathwayStep', {
  type: 'PathwayStep',
  args: {
    where: nonNull('PathwayStepWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.pathwayStep.findUnique({
      where,
      ...select,
    })
  },
})
