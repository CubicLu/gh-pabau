import { mutationField, nonNull } from 'nexus'

export const JobConfigurationUpdateManyMutation = mutationField(
  'updateManyJobConfiguration',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'JobConfigurationWhereInput',
      data: nonNull('JobConfigurationUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.jobConfiguration.updateMany(args as any)
    },
  },
)
