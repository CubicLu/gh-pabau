import { mutationField, nonNull } from 'nexus'

export const JobStatusUpdateManyMutation = mutationField(
  'updateManyJobStatus',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('JobStatusUpdateManyMutationInput'),
      where: 'JobStatusWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.jobStatus.updateMany(args as any)
    },
  },
)
