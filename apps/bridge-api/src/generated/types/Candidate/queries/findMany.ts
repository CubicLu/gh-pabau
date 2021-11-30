import { queryField, nonNull, list } from 'nexus'

export const CandidateFindManyQuery = queryField('findManyCandidate', {
  type: nonNull(list(nonNull('Candidate'))),
  args: {
    where: 'CandidateWhereInput',
    orderBy: list('CandidateOrderByWithRelationInput'),
    cursor: 'CandidateWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CandidateScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.candidate.findMany({
      ...args,
      ...select,
    })
  },
})
