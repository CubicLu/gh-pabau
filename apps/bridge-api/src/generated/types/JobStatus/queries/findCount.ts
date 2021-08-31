import { queryField, nonNull, list } from 'nexus'

export const JobStatusFindCountQuery = queryField('findManyJobStatusCount', {
  type: nonNull('Int'),
  args: {
    where: 'JobStatusWhereInput',
    orderBy: list('JobStatusOrderByWithRelationInput'),
    cursor: 'JobStatusWhereUniqueInput',
    distinct: 'JobStatusScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.jobStatus.count(args as any)
  },
})
