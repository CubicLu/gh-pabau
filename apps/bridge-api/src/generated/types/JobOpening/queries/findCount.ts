import { queryField, nonNull, list } from 'nexus'

export const JobOpeningFindCountQuery = queryField('findManyJobOpeningCount', {
  type: nonNull('Int'),
  args: {
    where: 'JobOpeningWhereInput',
    orderBy: list('JobOpeningOrderByWithRelationInput'),
    cursor: 'JobOpeningWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('JobOpeningScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.jobOpening.count(args as any)
  },
})
