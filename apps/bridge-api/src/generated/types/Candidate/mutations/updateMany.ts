import { mutationField, nonNull } from 'nexus'

export const CandidateUpdateManyMutation = mutationField(
  'updateManyCandidate',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CandidateWhereInput',
      data: nonNull('CandidateUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.candidate.updateMany(args as any)
    },
  },
)
