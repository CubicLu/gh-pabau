import { mutationField, nonNull } from 'nexus'

export const CandidateUpdateOneMutation = mutationField('updateOneCandidate', {
  type: nonNull('Candidate'),
  args: {
    where: nonNull('CandidateWhereUniqueInput'),
    data: nonNull('CandidateUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.candidate.update({
      where,
      data,
      ...select,
    })
  },
})
