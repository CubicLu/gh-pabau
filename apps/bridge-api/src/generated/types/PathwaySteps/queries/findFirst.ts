import { queryField, list } from 'nexus'

export const PathwayStepsFindFirstQuery = queryField('findFirstPathwaySteps', {
  type: 'PathwaySteps',
  args: {
    where: 'PathwayStepsWhereInput',
    orderBy: list('PathwayStepsOrderByWithRelationInput'),
    cursor: 'PathwayStepsWhereUniqueInput',
    distinct: 'PathwayStepsScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pathwaySteps.findFirst({
      ...args,
      ...select,
    })
  },
})
