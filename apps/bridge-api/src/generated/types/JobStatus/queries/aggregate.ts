import { queryField, list } from 'nexus'

export const JobStatusAggregateQuery = queryField('aggregateJobStatus', {
  type: 'AggregateJobStatus',
  args: {
    where: 'JobStatusWhereInput',
    orderBy: list('JobStatusOrderByInput'),
    cursor: 'JobStatusWhereUniqueInput',
    distinct: 'JobStatusScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.jobStatus.aggregate({ ...args, ...select }) as any
  },
})
