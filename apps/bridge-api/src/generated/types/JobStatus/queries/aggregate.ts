import { queryField, list } from 'nexus'

export const JobStatusAggregateQuery = queryField('aggregateJobStatus', {
  type: 'AggregateJobStatus',
  args: {
    where: 'JobStatusWhereInput',
    orderBy: list('JobStatusOrderByWithRelationInput'),
    cursor: 'JobStatusWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.jobStatus.aggregate({ ...args, ...select }) as any
  },
})
