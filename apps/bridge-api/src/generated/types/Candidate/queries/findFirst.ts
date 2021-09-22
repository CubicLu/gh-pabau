import { queryField, list } from 'nexus'

export const CandidateFindFirstQuery = queryField('findFirstCandidate', {
  type: 'Candidate',
  args: {
    where: 'CandidateWhereInput',
    orderBy: list('CandidateOrderByWithRelationInput'),
    cursor: 'CandidateWhereUniqueInput',
    distinct: 'CandidateScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.candidate.findFirst({
      ...args,
      ...select,
    })
  },
})
