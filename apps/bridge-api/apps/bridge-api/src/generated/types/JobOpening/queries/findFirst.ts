import { queryField, list } from 'nexus'

export const JobOpeningFindFirstQuery = queryField('findFirstJobOpening', {
  type: 'JobOpening',
  args: {
    where: 'JobOpeningWhereInput',
    orderBy: list('JobOpeningOrderByWithRelationInput'),
    cursor: 'JobOpeningWhereUniqueInput',
    distinct: 'JobOpeningScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.jobOpening.findFirst({
      ...args,
      ...select,
    })
  },
})
