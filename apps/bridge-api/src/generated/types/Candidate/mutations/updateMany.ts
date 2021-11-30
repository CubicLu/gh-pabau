import { mutationField, nonNull } from 'nexus'

export const CandidateUpdateManyMutation = mutationField(
  'updateManyCandidate',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CandidateUpdateManyMutationInput'),
      where: 'CandidateWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.candidate.updateMany(args as any)
    },
  },
)
