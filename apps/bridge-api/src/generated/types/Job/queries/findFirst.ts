import { queryField, list } from 'nexus'

export const JobFindFirstQuery = queryField('findFirstJob', {
  type: 'Job',
  args: {
    where: 'JobWhereInput',
    orderBy: list('JobOrderByInput'),
    cursor: 'JobWhereUniqueInput',
    distinct: 'JobScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.job.findFirst({
      ...args,
      ...select,
    })
  },
})
