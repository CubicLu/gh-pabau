import { queryField, list } from 'nexus'

export const PathwayStepsAggregateQuery = queryField('aggregatePathwaySteps', {
  type: 'AggregatePathwaySteps',
  args: {
    where: 'PathwayStepsWhereInput',
    orderBy: list('PathwayStepsOrderByWithRelationInput'),
    cursor: 'PathwayStepsWhereUniqueInput',
    distinct: 'PathwayStepsScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pathwaySteps.aggregate({ ...args, ...select }) as any
  },
})
