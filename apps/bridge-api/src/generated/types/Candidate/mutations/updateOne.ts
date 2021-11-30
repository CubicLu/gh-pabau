import { mutationField, nonNull } from 'nexus'

export const CandidateUpdateOneMutation = mutationField('updateOneCandidate', {
  type: nonNull('Candidate'),
  args: {
    data: nonNull('CandidateUpdateInput'),
    where: nonNull('CandidateWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.candidate.update({
      where,
      data,
      ...select,
    })
  },
})
