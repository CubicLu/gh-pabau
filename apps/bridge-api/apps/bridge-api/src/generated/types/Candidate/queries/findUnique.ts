import { queryField, nonNull } from 'nexus'

export const CandidateFindUniqueQuery = queryField('findUniqueCandidate', {
  type: 'Candidate',
  args: {
    where: nonNull('CandidateWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.candidate.findUnique({
      where,
      ...select,
    })
  },
})
