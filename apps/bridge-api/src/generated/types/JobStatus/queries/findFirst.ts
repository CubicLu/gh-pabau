import { queryField, list } from 'nexus'

export const JobStatusFindFirstQuery = queryField('findFirstJobStatus', {
  type: 'JobStatus',
  args: {
    where: 'JobStatusWhereInput',
    orderBy: list('JobStatusOrderByWithRelationInput'),
    cursor: 'JobStatusWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('JobStatusScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.jobStatus.findFirst({
      ...args,
      ...select,
    })
  },
})
