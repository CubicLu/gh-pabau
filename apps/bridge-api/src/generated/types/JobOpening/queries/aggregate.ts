import { queryField, list } from 'nexus'

export const JobOpeningAggregateQuery = queryField('aggregateJobOpening', {
  type: 'AggregateJobOpening',
  args: {
    where: 'JobOpeningWhereInput',
    orderBy: list('JobOpeningOrderByWithRelationInput'),
    cursor: 'JobOpeningWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.jobOpening.aggregate({ ...args, ...select }) as any
  },
})
