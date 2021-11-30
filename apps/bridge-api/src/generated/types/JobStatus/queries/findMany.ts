import { queryField, nonNull, list } from 'nexus'

export const JobStatusFindManyQuery = queryField('findManyJobStatus', {
  type: nonNull(list(nonNull('JobStatus'))),
  args: {
    where: 'JobStatusWhereInput',
    orderBy: list('JobStatusOrderByWithRelationInput'),
    cursor: 'JobStatusWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('JobStatusScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.jobStatus.findMany({
      ...args,
      ...select,
    })
  },
})
