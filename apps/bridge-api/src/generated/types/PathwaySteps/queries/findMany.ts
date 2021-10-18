import { queryField, nonNull, list } from 'nexus'

export const PathwayStepsFindManyQuery = queryField('findManyPathwaySteps', {
  type: nonNull(list(nonNull('PathwaySteps'))),
  args: {
    where: 'PathwayStepsWhereInput',
    orderBy: list('PathwayStepsOrderByWithRelationInput'),
    cursor: 'PathwayStepsWhereUniqueInput',
    distinct: 'PathwayStepsScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pathwaySteps.findMany({
      ...args,
      ...select,
    })
  },
})
