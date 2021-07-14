import { queryField, nonNull, list } from 'nexus'

export const JobOpeningFindCountQuery = queryField('findManyJobOpeningCount', {
  type: nonNull('Int'),
  args: {
    where: 'JobOpeningWhereInput',
    orderBy: list('JobOpeningOrderByInput'),
    cursor: 'JobOpeningWhereUniqueInput',
    distinct: 'JobOpeningScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.jobOpening.count(args as any)
  },
})
