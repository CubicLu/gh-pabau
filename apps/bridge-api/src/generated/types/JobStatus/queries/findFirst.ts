import { queryField, list } from 'nexus'

export const JobStatusFindFirstQuery = queryField('findFirstJobStatus', {
  type: 'JobStatus',
  args: {
    where: 'JobStatusWhereInput',
    orderBy: list('JobStatusOrderByInput'),
    cursor: 'JobStatusWhereUniqueInput',
    distinct: 'JobStatusScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.jobStatus.findFirst({
      ...args,
      ...select,
    })
  },
})
