import { queryField, nonNull, list } from 'nexus'

export const CandidateFindManyQuery = queryField('findManyCandidate', {
  type: nonNull(list(nonNull('Candidate'))),
  args: {
    where: 'CandidateWhereInput',
    orderBy: list('CandidateOrderByWithRelationInput'),
    cursor: 'CandidateWhereUniqueInput',
    distinct: 'CandidateScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.candidate.findMany({
      ...args,
      ...select,
    })
  },
})
