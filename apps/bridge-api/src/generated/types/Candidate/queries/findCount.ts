import { queryField, nonNull, list } from 'nexus'

export const CandidateFindCountQuery = queryField('findManyCandidateCount', {
  type: nonNull('Int'),
  args: {
    where: 'CandidateWhereInput',
    orderBy: list('CandidateOrderByWithRelationInput'),
    cursor: 'CandidateWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CandidateScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.candidate.count(args as any)
  },
})
