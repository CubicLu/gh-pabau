import { mutationField, nonNull } from 'nexus'

export const CandidateCreateOneMutation = mutationField('createOneCandidate', {
  type: nonNull('Candidate'),
  args: {
    data: nonNull('CandidateCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.candidate.create({
      data,
      ...select,
    })
  },
})
