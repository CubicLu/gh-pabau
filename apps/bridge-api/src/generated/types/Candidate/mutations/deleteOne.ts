import { mutationField, nonNull } from 'nexus'

export const CandidateDeleteOneMutation = mutationField('deleteOneCandidate', {
  type: 'Candidate',
  args: {
    where: nonNull('CandidateWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.candidate.delete({
      where,
      ...select,
    })
  },
})
