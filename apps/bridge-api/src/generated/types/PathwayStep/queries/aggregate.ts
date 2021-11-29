import { queryField, list } from 'nexus'

export const PathwayStepAggregateQuery = queryField('aggregatePathwayStep', {
  type: 'AggregatePathwayStep',
  args: {
    where: 'PathwayStepWhereInput',
    orderBy: list('PathwayStepOrderByWithRelationInput'),
    cursor: 'PathwayStepWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pathwayStep.aggregate({ ...args, ...select }) as any
  },
})
