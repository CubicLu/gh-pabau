import { queryField, list } from 'nexus'

export const CandidateFindFirstQuery = queryField('findFirstCandidate', {
  type: 'Candidate',
  args: {
    where: 'CandidateWhereInput',
    orderBy: list('CandidateOrderByWithRelationInput'),
    cursor: 'CandidateWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CandidateScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.candidate.findFirst({
      ...args,
      ...select,
    })
  },
})
