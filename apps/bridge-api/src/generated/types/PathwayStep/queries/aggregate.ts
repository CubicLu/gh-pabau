import { queryField, list } from 'nexus'

export const PathwayStepAggregateQuery = queryField('aggregatePathwayStep', {
  type: 'AggregatePathwayStep',
  args: {
    where: 'PathwayStepWhereInput',
    orderBy: list('PathwayStepOrderByWithRelationInput'),
    cursor: 'PathwayStepWhereUniqueInput',
    distinct: 'PathwayStepScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pathwayStep.aggregate({ ...args, ...select }) as any
  },
})
