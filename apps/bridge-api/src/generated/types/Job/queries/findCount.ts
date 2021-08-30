import { queryField, nonNull, list } from 'nexus'

export const JobFindCountQuery = queryField('findManyJobCount', {
  type: nonNull('Int'),
  args: {
    where: 'JobWhereInput',
    orderBy: list('JobOrderByInput'),
    cursor: 'JobWhereUniqueInput',
    distinct: 'JobScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.job.count(args as any)
  },
})
