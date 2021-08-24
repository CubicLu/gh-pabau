import { mutationField, nonNull } from 'nexus'

export const JobStatusUpdateManyMutation = mutationField(
  'updateManyJobStatus',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'JobStatusWhereInput',
      data: nonNull('JobStatusUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.jobStatus.updateMany(args as any)
    },
  },
)
