import { queryField, nonNull, list } from 'nexus'

export const JobOpeningFindManyQuery = queryField('findManyJobOpening', {
  type: nonNull(list(nonNull('JobOpening'))),
  args: {
    where: 'JobOpeningWhereInput',
    orderBy: list('JobOpeningOrderByWithRelationInput'),
    cursor: 'JobOpeningWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('JobOpeningScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.jobOpening.findMany({
      ...args,
      ...select,
    })
  },
})
