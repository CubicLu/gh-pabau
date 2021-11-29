import { queryField, list } from 'nexus'

export const JobAggregateQuery = queryField('aggregateJob', {
  type: 'AggregateJob',
  args: {
    where: 'JobWhereInput',
    orderBy: list('JobOrderByWithRelationInput'),
    cursor: 'JobWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.job.aggregate({ ...args, ...select }) as any
  },
})
