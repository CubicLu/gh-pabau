import { mutationField, nonNull } from 'nexus'

export const CandidateUpsertOneMutation = mutationField('upsertOneCandidate', {
  type: nonNull('Candidate'),
  args: {
    where: nonNull('CandidateWhereUniqueInput'),
    create: nonNull('CandidateCreateInput'),
    update: nonNull('CandidateUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.candidate.upsert({
      ...args,
      ...select,
    })
  },
})
