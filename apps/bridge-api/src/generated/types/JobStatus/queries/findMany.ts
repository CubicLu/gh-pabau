import { queryField, nonNull, list } from 'nexus'

export const JobStatusFindManyQuery = queryField('findManyJobStatus', {
  type: nonNull(list(nonNull('JobStatus'))),
  args: {
    where: 'JobStatusWhereInput',
    orderBy: list('JobStatusOrderByWithRelationInput'),
    cursor: 'JobStatusWhereUniqueInput',
    distinct: 'JobStatusScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.jobStatus.findMany({
      ...args,
      ...select,
    })
  },
})
