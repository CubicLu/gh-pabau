import { queryField, nonNull, list } from 'nexus'

export const CandidateFindCountQuery = queryField('findManyCandidateCount', {
  type: nonNull('Int'),
  args: {
    where: 'CandidateWhereInput',
    orderBy: list('CandidateOrderByWithRelationInput'),
    cursor: 'CandidateWhereUniqueInput',
    distinct: 'CandidateScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.candidate.count(args as any)
  },
})
